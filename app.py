from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import pymysql.cursors
from werkzeug.security import generate_password_hash, check_password_hash
import pymysql
import logging

# Initialize Flask app
app = Flask(__name__)

# Database configuration
DB_USERNAME = 'root'
DB_PASSWORD = 'haritha'
DB_HOST = '127.0.0.1'
DB_NAME = 'xcel_ai_platform'

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'a3f1e0b8c2d4f7a96b3c8e1a9d5f4b2e3c6d1a8f7e4b9c2d3f0a7b1e6c5d4f9'

# Initialize database
db = SQLAlchemy(app)

# Configure Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login" #type: ignore

# Logging setup
logging.basicConfig(level=logging.DEBUG)

def get_db_connection():
    return pymysql.connect(host=DB_HOST, user=DB_USERNAME, password=DB_PASSWORD, database=DB_NAME, cursorclass=pymysql.cursors.DictCursor)

# User Model
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password, method='pbkdf2:sha256')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/about')
def about():
    return render_template('about.html')

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        form_type = request.form.get("form_type")  

        if form_type == "register":
            username = request.form.get("username")
            email = request.form.get("email")
            password = request.form.get("password")
            confirmpassword = request.form.get("confirmpassword")

            if not all([username, email, password, confirmpassword]):
                flash("All fields are required!", "danger")
                return redirect(url_for("login"))

            if password != confirmpassword:
                flash("Passwords do not match!", "danger")
                return redirect(url_for("login"))

            existing_user = User.query.filter_by(email=email).first()
            if existing_user:
                flash("Email already registered. Please log in.", "warning")
                return redirect(url_for("login"))

            new_user = User(username=username, email=email, password=password)
            db.session.add(new_user)
            db.session.commit()
            flash("Account created! Please log in.", "success")
            logging.info(f"New user created: {username}, {email}")
            return redirect(url_for("login"))

        elif form_type == "login":
            username = request.form.get("username")
            password = request.form.get("password")
            user = User.query.filter_by(username=username).first()

            if user and check_password_hash(user.password, password): #type: ignore
                login_user(user)
                session['user_id'] = user.id
                flash("Login successful!", "success")
                logging.info(f"User logged in: {user.username}")
                return redirect(url_for("home"))  
            else:
                flash("Invalid username or password!", "danger")
                return redirect(url_for("login"))

    return render_template("login.html")

@app.route("/home")
@login_required
def home():
    if 'user_id' not in session: 
        return redirect(url_for('login'))
    return render_template("home.html", user=current_user)

@app.route("/profile")
@login_required
def profile():
    return render_template("profile.html", user=current_user)

@app.route("/logout")
@login_required
def logout():
    logout_user()
    session.pop('user_id', None)  # Clear session
    flash("You have been logged out.", "info")
    return redirect(url_for("index"))

@app.route("/clear-session")
def clear_session():
    session.clear()
    return "Session cleared!"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Ensure database tables are created
    app.run(debug=True)
