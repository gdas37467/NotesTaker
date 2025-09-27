from flask import Flask
from flask_cors import CORS
from src.routes.auth import bp as auth_bp
from src.routes.notes import bp as notes_bp
import os


app = Flask(__name__)
CORS(app)


app.register_blueprint(auth_bp)
app.register_blueprint(notes_bp)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)