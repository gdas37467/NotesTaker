from pymongo import MongoClient
import os
from datetime import datetime


MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
client = MongoClient(MONGO_URL)
db = client['notes_app']
users_col = db['users']
notes_col = db['notes']

