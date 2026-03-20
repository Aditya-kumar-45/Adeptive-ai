# models.py
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime
import re

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'
    
    # Primary key
    id = db.Column(db.Integer, primary_key=True)
    
    # User details
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'student' or 'teacher'
    
    # Student specific (if role = 'student')
    student_id = db.Column(db.String(50), unique=True, nullable=True)
    
    # Teacher specific (if role = 'teacher')
    email = db.Column(db.String(120), unique=True, nullable=True)
    
    # Authentication
    password_hash = db.Column(db.String(128), nullable=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Status
    is_active = db.Column(db.Boolean, default=True)
    last_login = db.Column(db.DateTime, nullable=True)

    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        """Check if password matches hash"""
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        """Convert user object to dictionary for API responses"""
        user_dict = {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_active': self.is_active
        }
        
        # Add role-specific identifier
        if self.role == 'student':
            user_dict['student_id'] = self.student_id
        else:
            user_dict['email'] = self.email
            
        return user_dict
    
    @staticmethod
    def find_by_identifier(role, identifier):
        """
        Find user by role and identifier
        For students: search by student_id
        For teachers: search by email
        """
        if role == 'student':
            return User.query.filter_by(student_id=identifier, role='student').first()
        else:
            return User.query.filter_by(email=identifier, role='teacher').first()
    
    @staticmethod
    def validate_email(email):
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def validate_student_id(student_id):
        """Validate student ID (alphanumeric)"""
        pattern = r'^[A-Za-z0-9]+$'
        return re.match(pattern, student_id) is not None
    
    def __repr__(self):
        return f'<User {self.id}: {self.name} ({self.role})>'


class LoginHistory(db.Model):
    """Track user login history (optional)"""
    __tablename__ = 'login_history'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    login_time = db.Column(db.DateTime, default=datetime.utcnow)
    ip_address = db.Column(db.String(45), nullable=True)
    user_agent = db.Column(db.String(200), nullable=True)
    success = db.Column(db.Boolean, default=True)
    
    user = db.relationship('User', backref='login_history')


class TokenBlacklist(db.Model):
    """Store revoked JWT tokens"""
    __tablename__ = 'token_blacklist'
    
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    token_type = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    revoked_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)