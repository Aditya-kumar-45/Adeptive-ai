from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import timedelta, datetime
import requests
import json
import re

app = Flask(__name__)
# 👉 Fix: Change port 5000 to 5173
CORS(app, origins=["http://localhost:5173","http://127.0.0.1:5173"], supports_credentials=True)
# --- CONFIGURATION ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ailearn.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-change-this-in-production'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-key-change-this'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# --- INITIALIZE EXTENSIONS ---
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- VALIDATION REGEX ---
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
STUDENT_ID_REGEX = re.compile(r'^[A-Za-z0-9]+$')  # Alphanumeric student ID

# --- DATABASE MODELS ---
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'student' or 'teacher'
    
    # Student specific
    student_id = db.Column(db.String(50), unique=True, nullable=True)
    
    # Teacher specific
    email = db.Column(db.String(120), unique=True, nullable=True)
    
    # Password and timestamps
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        user_dict = {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
        
        # Add role-specific identifier
        if self.role == 'student':
            user_dict['student_id'] = self.student_id
        else:
            user_dict['email'] = self.email
            
        return user_dict
    
    @staticmethod
    def find_by_identifier(role, identifier):
        """Find user by role and identifier (student_id or email)"""
        if role == 'student':
            return User.query.filter_by(student_id=identifier, role='student').first()
        else:
            return User.query.filter_by(email=identifier, role='teacher').first()


class TokenBlacklist(db.Model):
    __tablename__ = 'token_blacklist'
    
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    token_type = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    revoked_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)


# Create tables
with app.app_context():
    db.create_all()
    print("Database tables created!")

# --- HELPER FUNCTIONS ---
def validate_password(password):
    if len(password) < 6:
        return False, "Password must be at least 6 characters long"
    return True, "Password is valid"

# --- AUTHENTICATION ROUTES ---

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Server is running"}), 200

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not data.get('role') or not data.get('name') or not data.get('password'):
            return jsonify({"error": "Missing required fields"}), 400
        
        role = data.get('role')
        name = data.get('name').strip()
        password = data.get('password')
        
        # Validate role
        if role not in ['student', 'teacher']:
            return jsonify({"error": "Invalid role. Must be 'student' or 'teacher'"}), 400
        
        # Validate based on role
        if role == 'student':
            if 'studentId' not in data:
                return jsonify({"error": "Student ID is required for students"}), 400
            
            student_id = data.get('studentId').strip()
            
            # Validate student ID format
            if not STUDENT_ID_REGEX.match(student_id):
                return jsonify({"error": "Student ID must be alphanumeric"}), 400
            
            # Check if student ID already exists
            if User.query.filter_by(student_id=student_id).first():
                return jsonify({"error": "Student ID already registered"}), 409
            
            identifier = student_id
            
        else:  # teacher
            if 'email' not in data:
                return jsonify({"error": "Email is required for teachers"}), 400
            
            email = data.get('email').strip().lower()
            
            # Validate email format
            if not EMAIL_REGEX.match(email):
                return jsonify({"error": "Invalid email format"}), 400
            
            # Check if email already exists
            if User.query.filter_by(email=email).first():
                return jsonify({"error": "Email already registered"}), 409
            
            identifier = email
        
        # Validate password
        is_valid, message = validate_password(password)
        if not is_valid:
            return jsonify({"error": message}), 400
        
        # Validate name
        if len(name) < 2:
            return jsonify({"error": "Name must be at least 2 characters long"}), 400
        
        # Create new user
        new_user = User(
            name=name,
            role=role
        )
        
        # Set role-specific identifier
        if role == 'student':
            new_user.student_id = identifier
        else:
            new_user.email = identifier
        
        # Set password
        new_user.set_password(password)
        
        # Save to database
        db.session.add(new_user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(
            identity=str(new_user.id),
            additional_claims={
                "name": new_user.name,
                "role": new_user.role,
                "identifier": identifier
            },
            expires_delta=timedelta(hours=24)
        )
        
        return jsonify({
            "message": "User created successfully",
            "user": new_user.to_dict(),
            "access_token": access_token
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Signup error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not data.get('role') or not data.get('identifier') or not data.get('password'):
            return jsonify({"error": "Missing required fields"}), 400
        
        role = data.get('role')
        identifier = data.get('identifier').strip()
        password = data.get('password')
        
        # Validate role
        if role not in ['student', 'teacher']:
            return jsonify({"error": "Invalid role"}), 400
        
        # Format identifier based on role
        if role == 'teacher':
            identifier = identifier.lower()
        
        # Find user by role and identifier
        user = User.find_by_identifier(role, identifier)
        
        # Check if user exists and password is correct
        if not user or not user.check_password(password):
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Check if user is active
        if not user.is_active:
            return jsonify({"error": "Account is deactivated"}), 403
        
        # Create access token
        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={
                "name": user.name,
                "role": user.role,
                "identifier": identifier
            },
            expires_delta=timedelta(hours=24)
        )
        
        return jsonify({
            "message": "Login successful",
            "user": user.to_dict(),
            "access_token": access_token
        }), 200
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(int(current_user_id))
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({
            "user": user.to_dict()
        }), 200
        
    except Exception as e:
        print(f"Profile error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        jti = get_jwt()['jti']
        token_type = get_jwt()['type']
        user_id = get_jwt_identity()
        expires_at = datetime.fromtimestamp(get_jwt()['exp'])
        
        # Blacklist the token
        blacklisted_token = TokenBlacklist(
            jti=jti,
            token_type=token_type,
            user_id=int(user_id),
            expires_at=expires_at
        )
        
        db.session.add(blacklisted_token)
        db.session.commit()
        
        return jsonify({"message": "Successfully logged out"}), 200
        
    except Exception as e:
        print(f"Logout error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


# Check if token is blacklisted
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    token = TokenBlacklist.query.filter_by(jti=jti).first()
    return token is not None


# --- QUIZ GENERATION ROUTE (Your existing code) ---
@app.route('/api/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.json
    topic, level = data.get('topic'), data.get('level')

    # Make sure your real key is here!
    API_KEY = "AIzaSyC9309GYGmAP4OcSxGJJBw7YxVH6gmNKVk" 
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"
    
    prompt = f"""Generate a 3-question multiple-choice quiz about "{topic}" for "{level}" level.
    Return ONLY a valid JSON array. Format:
    [ {{"q": "Question?", "options": ["A", "B", "C"], "ans": 0, "hint": "Hint"}} ]"""

    try:
        res = requests.post(url, headers={'Content-Type': 'application/json'}, json={"contents": [{"parts": [{"text": prompt}]}]})
        
        if res.status_code != 200:
            return jsonify({"error": "Google API blocked the request"}), 500

        # Extract text safely
        raw_text = res.json()['candidates'][0]['content']['parts'][0]['text']
        
        # Smarter way to grab just the JSON array and ignore any extra text Gemini adds
        start_idx = raw_text.find('[')
        end_idx = raw_text.rfind(']') + 1
        clean_text = raw_text[start_idx:end_idx]
        
        return jsonify(json.loads(clean_text)), 200
        
    except Exception as e:
        print("\n--- PYTHON CRASH REASON ---")
        print(str(e))
        print("---------------------------\n")
        return jsonify({"error": str(e)}), 500


# --- DOUBT ASKING ROUTE (Your existing code) ---
@app.route('/api/ask-doubt', methods=['POST'])
def ask_doubt():
    data = request.json
    topic = data.get('topic')
    level = data.get('level')
    user_question = data.get('question')

    # Make sure your real key is here!
    API_KEY = "AIzaSyC9309GYGmAP4OcSxGJJBw7YxVH6gmNKVk" 
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

    prompt = f"""
    You are an expert, friendly Computer Science tutor.
    The student's current proficiency level is: {level}.
    The current topic is: {topic}.
    
    The student asks: "{user_question}"
    
    Provide a clear, highly accurate, and concise answer directly addressing their question. 
    Make sure your explanation matches a {level} understanding (e.g., use simple analogies for Beginners, and technical accuracy for Advanced). Do NOT use markdown formatting like asterisks or bolding, just plain text.
    """

    try:
        res = requests.post(url, headers={'Content-Type': 'application/json'}, json={"contents": [{"parts": [{"text": prompt}]}]})
        
        if res.status_code != 200:
            return jsonify({"error": "Google API blocked the request"}), 500

        # Extract text response from Gemini
        raw_text = res.json()['candidates'][0]['content']['parts'][0]['text'].strip()
        
        # We send it back as a simple JSON object
        return jsonify({"answer": raw_text}), 200
        
    except Exception as e:
        print("Backend Error:", str(e))
        return jsonify({"error": "Failed to connect to AI."}), 500


# --- TEST ENDPOINT (Optional - for debugging) ---
@app.route('/api/users', methods=['GET'])
def get_all_users():
    try:
        users = User.query.all()
        return jsonify({
            "users": [user.to_dict() for user in users],
            "count": len(users)
        }), 200
    except Exception as e:
        print(f"Get users error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    # Running on port 8000 as you requested
    app.run(debug=True, port=8000)