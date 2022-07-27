from flask_app import app
from flask_app.models.card_model import Card
from flask import render_template, request, redirect, session, jsonify


@app.route("/cards")
def get_all_cards():
    return jsonify(Card.get_all_cards())
