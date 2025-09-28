from flask import Blueprint, request, jsonify
from src.db import notes_col
from src.utils.jwt_util import decode_token
from datetime import datetime
import uuid


bp = Blueprint('notes', __name__, url_prefix='/api/notes')


def get_user_from_header():
    auth = request.headers.get('Authorization')
    if not auth:
        return None
    token = auth.split(' ')[1]
    try:
        payload = decode_token(token)
        return payload
    except Exception:
        return None


@bp.route('/', methods=['GET'])
def list_notes():
    user = get_user_from_header()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = user['user_id']
    data = notes_col.find({'user_id': user_id}).sort('last_update', -1)
    notes = []
    for n in data:
        n['_id'] = str(n['_id'])
        notes.append(n)
    return jsonify(notes),200


@bp.route('/', methods=['POST'])
def create_note():
    user = get_user_from_header()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    note_id = str(uuid.uuid4())
    now = datetime.now()
    note = {
        'note_id': note_id,
        'note_title': data.get('title', ''),
        'note_content': data.get('content', ''),
        'user_id': user['user_id'],
        'created_on': now,
        'last_update': now
    }
    print(note)
    result = notes_col.insert_one(note)
    note['_id'] = str(result.inserted_id)
    return jsonify(note), 201


@bp.route('/<note_id>', methods=['PUT'])
def update_note(note_id):
    user = get_user_from_header()
    if not user:
        return jsonify({'error': 'unauth'}), 401
    data = request.json
    now = datetime.now()
    print(note_id)
    update = {
        '$set': {
            'note_title': data.get('title', ''),
            'note_content': data.get('content', ''),
            'last_update': now
        }
    }
    res = notes_col.update_one({'note_id': note_id, 'user_id': user['user_id']}, update)
    if res.matched_count == 0:
        return jsonify({'error': 'not found'}), 404
    return jsonify({'ok': True})


@bp.route('/<note_id>', methods=['DELETE'])
def delete_note(note_id):
    user = get_user_from_header()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    res = notes_col.delete_one({'note_id': note_id, 'user_id': user['user_id']})
    if res.deleted_count == 0:
        return jsonify({'error': 'not found'}), 404
    return jsonify({'ok': True})