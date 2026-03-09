from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

# --- DATABASE SETUP ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ailearn.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='student')

with app.app_context():
    db.create_all()

# --- ROUTES ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"error": "Email already exists"}), 400
    
    new_user = User(
        name=data.get('name'), 
        email=data.get('email'), 
        password=data.get('password'), 
        role=data.get('role', 'student')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Success"}), 201


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


# 👉 FIXED INDENTATION HERE: Moved all the way to the left edge!
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


if __name__ == '__main__':
    # Running on port 8000 as you requested
    app.run(debug=True, port=8000)