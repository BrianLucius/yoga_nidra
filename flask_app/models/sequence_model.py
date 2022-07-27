import os
from flask_app.config.mysqlconnection import connectToMySQL
from flask import json

from dotenv import load_dotenv
load_dotenv()

DATABASE = os.environ.get("MY_SQL_DB")

class Sequence:
    def __init__(self , data):
        self.id = data['id']
        self.user_id = data['user_id']
        self.sequence_visibility = data['sequence_visibility']
        self.sequence_title = data['sequence_title']
        self.sequence_description = data['sequence_description']
        self.sequence_card_sequence = data['sequence_card_sequence']
        self.sequence_played_count = data['sequence_played_count']
        self.sequence_last_played = data['sequence_last_played']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def get_sequences_by_user(cls, data):
        query = "SELECT * "
        query+= "FROM sequences "
        query+= "WHERE user_id=%(user_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)

    @classmethod
    def get_sequence_by_id(cls, data):
        query = "SELECT * "
        query+= "FROM sequences "
        query+= "WHERE id=%(id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)

        query2 = "SELECT cards.*, phases.* "
        query2+= "FROM sequences seq "
        query2+= "JOIN JSON_TABLE( "
        query2+= "seq.sequence_card_sequence, "
        query2+= "'$[*]' COLUMNS (card_id varchar(255) PATH '$') "
        query2+= ") json "
        query2+= "JOIN cards "
        query2+= "ON json.card_id = cards.id "
        query2+= "JOIN phases "
        query2+= "ON cards.phase_id = phases.id "
        query2+= "WHERE seq.id = %(id)s;"
        cards = connectToMySQL(DATABASE).query_db(query2, data)
        results.append(cards)
        return  results

    @classmethod
    def save_sequence_for_user(cls, data):
        data = {
            **data,
            # "sequence_card_sequence": ",".join(data['sequence_card_sequence'])
            "sequence_card_sequence": json.dumps(data['sequence_card_sequence'])
        }
        query = "INSERT INTO sequences (user_id, sequence_visibility, sequence_title, sequence_description, sequence_card_sequence, sequence_played_count, sequence_last_played) "
        query+= "VALUES (%(user_id)s, %(sequence_visibility)s, %(sequence_title)s, %(sequence_description)s, %(sequence_card_sequence)s, 0, null);"
        return connectToMySQL(DATABASE).query_db(query, data)

    @classmethod
    def update_one_sequence(cls, data):
        query = "UPDATE sequences "
        query+= "SET sequence_title=%(sequence_title)s, sequence_visibility=%(sequence_visibility)s, sequence_description=%(sequence_description)s, sequence_card_sequence=%(sequence_card_sequence)s) "
        query+= "WHERE id=%(sequence_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)

    @classmethod
    def delete_sequence(cls, data):
        query = "DELETE FROM sequences "
        query+= "WHERE id=%(sequence_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)
