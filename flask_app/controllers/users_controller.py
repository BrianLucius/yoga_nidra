from flask_app import app
from flask_app.models.user_model import User
from flask import render_template, request, redirect, session, jsonify
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

# render paths
@app.route("/")
@app.route("/default")
def user_login():
    return render_template("login.html")

@app.route("/register")
def register_account():
    return render_template("register.html")

@app.route("/recover")
def account_recovery():
    return render_template("account_recovery.html")

# POST method paths
@app.route("/user/registration", methods=['POST'])
def process_registration():
    # Validate form data
    result = User.validate_registration_form(request.form)
    if not result['is_valid']:
        response = {
            'message' : result['messages']
        }
        return jsonify(response), 200
    # Determine if email or username is already registered
    # result = User.check_username_email_availability(request.form)
    # print("Result",result)
    # if not result['is_valid']:
    #     response = {
    #         'message' : result['messages']
    #     }
    #     return jsonify(response), 200
    # If all is good, register user in DB
    data = {
        **request.form,
        'password': bcrypt.generate_password_hash(request.form['password'])
    }
    user_id = User.create_account(data)
    # //TODO: add query execution validation in case DB is down/unavailable/fails
    # Set session vars and return success message
    session['user_id'] = user_id
    session['first_name'] = data['first_name']
    session['last_name'] = data['last_name']
    session['username'] = data['username']
    response = {
        "message" : "success"
    }
    return jsonify(response), 201

@app.route("/user/login", methods=['POST'])
def process_login():
    result =  User.validate_login(request.form)
    if not result['is_valid']:
        response = {
            'message' : result['messages']
        }
        return jsonify(response), 200

    current_user = User.get_account_by_username(request.form)

    if current_user:
        if not bcrypt.check_password_hash(current_user.password, request.form['password']):
            response = {
                'message' : {'login_error_invalid_credentials' : "Error logging in, please try again"}
            }
            return jsonify(response), 200

        session['user_id'] = current_user.id
        session['first_name'] = current_user.first_name
        session['last_name'] = current_user.last_name
        session['username'] = current_user.username

        response = {
        "message" : "success"
        }
        return jsonify(response), 200

    response = {
                'message' : {'login_error_invalid_credentials' : "Error logging in, please try again"}
            }
    return jsonify(response), 200

@app.route("/user/logout")
def process_logout():
    session.clear()
    return redirect('/')