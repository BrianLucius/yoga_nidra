from urllib import response
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import re, os

from dotenv import load_dotenv
load_dotenv()

DATABASE = os.environ.get("MY_SQL_DB")
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
PW_UPPER_COMPLEXITY_REGEX = re.compile(r'^(?:.*[A-Z])')
PW_NUMBER_COMPLEXITY_REGEX = re.compile(r'^(?:.*\d)')

class User:
    def __init__(self , data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.username = data['username']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def check_username_email_availability(cls, data):
        response_message = {}
        response_message["is_valid"] = True
        messages={}

        query = "SELECT * FROM users WHERE email=lower(%(email)s) OR lower(username)=lower(%(username)s);"
        result = connectToMySQL(DATABASE).query_db(query, data)

        if len(result) > 0:
            current_user = cls(result[0])

            if current_user.email == data['email']:
                messages["error_registration_email"] = "Email address is already in use"
                response_message["is_valid"] = False
            if current_user.username == data['username']:
                messages["error_registration_username"] = "The username is already taken"
                response_message["is_valid"] = False
            response_message['messages'] = messages
            return response_message
        return response_message

    @classmethod
    def create_account(cls, data):
        # Check if any users exist, if not create first user as admin user
        # Otherwise new users are created as facilitator users
        query = "SELECT * FROM users;"
        result = connectToMySQL(DATABASE).query_db(query, data)
        if len(result) > 0:
            user_role = "Facilitator"
        else:
            user_role = "Administrator"

        data = {
            **data,
            "role": user_role
        }

        query = "INSERT INTO users "
        query+= "SELECT null, roles.id, 1, %(first_name)s, %(last_name)s, %(username)s, lower(%(email)s), %(password)s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP "
        query+= "FROM roles WHERE role_name=%(role)s;"
        result = connectToMySQL(DATABASE).query_db(query, data)
        return result

    @classmethod
    def get_account_by_username(cls, data):
        query = "SELECT * FROM users WHERE lower(username)=lower(%(username)s);"
        result = connectToMySQL(DATABASE).query_db(query, data)
        if len(result) > 0:
            current_user = cls(result[0])
            return current_user
        return None

    @staticmethod
    def validate_registration_form(data):
        response_message = {}
        response_message["is_valid"] = True
        messages={}
        if len(data['first_name']) == 0:
            messages["error_registration_first_name"] = "First name is required"
            response_message["is_valid"] = False
        elif len(data['first_name']) < 2:
            messages["error_registration_first_name"] = "First name must be more than two characters"
            response_message["is_valid"] = False
        if len(data['last_name']) == 0:
            messages["error_registration_last_name"] = "Last name is required"
            response_message["is_valid"] = False
        elif len(data['last_name']) < 2:
            messages["error_registration_last_name"] = "Last name must be more than two characters"
            response_message["is_valid"] = False
        if len(data['email']) == 0:
            messages["error_registration_email"] = "Email address is required"
            response_message["is_valid"] = False
        elif not EMAIL_REGEX.match(data['email']):
            messages["error_registration_email"] = "Your email address is invalid"
            response_message["is_valid"] = False
        if len(data['username']) == 0:
            messages["error_registration_username"] = "Username is required"
            response_message["is_valid"] = False
        elif len(data['username']) < 2:
            messages["error_registration_username"] = "Username must be more than eight characters"
            response_message["is_valid"] = False
        if data['password'] == "":
            messages["error_registration_password"] = "A password is required"
            response_message["is_valid"] = False
        elif len(data['password']) < 8:
            messages["error_registration_password"] = "Your password must be more than eight characters"
            response_message["is_valid"] = False
        elif not (PW_UPPER_COMPLEXITY_REGEX.match(data['password']) and PW_NUMBER_COMPLEXITY_REGEX.match(data['password'])):
            messages["error_registration_password"] = "Password must have at least one number and one uppercase character."
            response_message["is_valid"]  = False
        if data['password_confirmation'] == "":
            messages["error_registration_password_confirmation"] = "Please confirm your password"
            response_message["is_valid"] = False
        elif data['password'] != data['password_confirmation']:
            messages["error_registration_password_confirmation"] = "Your passwords do not match"
            response_message["is_valid"] = False
        if messages:
            response_message['messages'] = messages
        return response_message

    @staticmethod
    def validate_login(data):
        response_message = {}
        response_message["is_valid"] = True
        messages={}
        if len(data['username']) == 0:
            messages["login_error_username"] = "You must enter your username"
            response_message["is_valid"] = False
        if len(data['password']) == 0:
            messages["login_error_password"] = "You must enter your password"
            response_message["is_valid"] = False
        if messages:
            response_message['messages'] = messages
        return response_message