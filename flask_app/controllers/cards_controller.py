from flask_app import app
from flask_app.models.card_model import Card
from flask_app.models.user_model import User
from flask import render_template, request, redirect, session, jsonify

# render paths
@app.route("/dashboard")
def user_dashboard():
    if 'user_id' not in session:
        return redirect('/')
    return render_template("dashboard.html")
