from flask_app import app
from flask_app.models.sequence_model import Sequence
from flask import render_template, request, redirect, session, jsonify

# render paths
@app.route("/dashboard")
def user_dashboard():
    if 'user_id' not in session:
        return redirect('/')
    data = {
        "user_id": session["user_id"]
    }
    return render_template("dashboard.html")

@app.route("/sequences")
def get_user_sequences():
    if 'user_id' not in session:
        return redirect('/')
    data = {
        "user_id" : session['user_id']
    }
    return jsonify(Sequence.get_sequences_by_user(data))

@app.route("/sequence/save", methods=['POST'])
def save_sequence():
    if 'user_id' not in session:
        return redirect('/')
    data = {
        **request.get_json(),
        "user_id": session['user_id']
    }
    result = Sequence.save_sequence_for_user(data)
    return jsonify('success'), 200

@app.route("/sequence/view", methods=['POST'])
def get_sequence():
    if 'user_id' not in session:
        return redirect('/')
    data = {
        **request.get_json()
    }
    result = Sequence.get_sequence_by_id(data)
    return jsonify(result), 200

@app.route("/sequence/delete", methods=['POST'])
def delete_sequence():
    if 'user_id' not in session:
        return redirect('/')
    data = {
        **request.get_json()
    }
    Sequence.delete_sequence(data)
    return jsonify('success'), 200
