from flask_app.config.mysqlconnection import connectToMySQL

import os
from dotenv import load_dotenv
load_dotenv()

DATABASE = os.environ.get("MY_SQL_DB")

class Card:
    def __init__(self , data):
        self.field1 = data['field1']
        self.field2 = data['field2']

    @classmethod
    def class_method(cls):
        query = "SELECT * FROM dojos;"
        results = connectToMySQL(DATABASE).query_db(query)
        var1 = []
        for var_item in results:
            var1.append( cls(var1) )
        return var1