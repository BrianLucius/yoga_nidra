import os
from flask_app.config.mysqlconnection import connectToMySQL

from dotenv import load_dotenv
load_dotenv()

DATABASE = os.environ.get("MY_SQL_DB")

class Card:
    def __init__(self , data):
        self.id = data['id']
        self.phase_id = data['phase_id']
        self.phase_number = data['phase_number']
        self.phase_name = data['phase_name']
        self.phase_description = data['phase_description']
        self.phase_choose_description = data['phase_choose_description']
        self.card_number = data['card_number']
        self.card_title = data['card_title']
        self.card_content_front = data['card_content_front']
        self.card_content_back = data['card_content_back']
        self.card_content_img_front = data['card_content_img_front']
        self.card_content_img_back = data['card_content_img_back']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def get_all_cards(cls):
        query = "SELECT cards.id, cards.phase_id, phases.phase_number, phases.phase_number_text, phases.phase_name, phases.phase_description, "
        query+= "phases.phase_choose_description, cards.card_number, cards.card_title, cards.card_content_front, "
        query+= "cards.card_content_back, cards.card_content_img_front, cards.card_content_img_back, cards.created_at, cards.updated_at "
        query+= "FROM cards "
        query+= "JOIN phases "
        query+= "ON cards.phase_id = phases.id;"
        return connectToMySQL(DATABASE).query_db(query)

