import os
import jwt
from datetime import datetime, timedelta


JWT_SECRET = os.getenv('JWT_SECRET', 'xyz-zyz')
JWT_ALGO = 'HS256'
ACCESS_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days


def create_access_token(payload: dict, expires_delta: int = ACCESS_EXPIRE_MINUTES):
    to_encode = payload.copy()
    expire = datetime.now() + timedelta(minutes=expires_delta)
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGO)


def decode_token(token: str):
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])