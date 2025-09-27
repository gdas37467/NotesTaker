from flask import Blueprint, request, jsonify
from src.db import users_col
from passlib.hash import bcrypt_sha256 as bcrypt
from src.utils.jwt_util import create_access_token
import uuid
from datetime import datetime


bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'email/password required'}), 400
    if users_col.find_one({'user_email': email}):
        print('exists')
        return jsonify({'error': 'user exists'}), 409
    user_id = str(uuid.uuid4())
    hashed = bcrypt.hash(password)
    user = {
        'user_id': user_id,
        'user_name': name,
        'user_email': email,
        'password': hashed,
        'create_on': datetime.now(),
        'last_update': datetime.now()
    }
    users_col.insert_one(user)
    token = create_access_token({'user_id': user_id, 'user_email': email})
    return jsonify({'token': token, 'user': {'user_id': user_id, 'user_email': email, 'user_name': name}})


@bp.route('/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = users_col.find_one({'user_email': email})
    if not user:
        return jsonify({'error': 'invalid credentials'}), 401
    if not bcrypt.verify(password, user['password']):
        return jsonify({'error': 'invalid credentials'}), 401
    token = create_access_token({'user_id': user['user_id'], 'user_email': user['user_email']})
    return jsonify({'token': token, 'user': {'user_id': user['user_id'], 'user_email': user['user_email'], 'user_name': user.get('user_name')}})