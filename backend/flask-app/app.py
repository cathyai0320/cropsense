import json
import sys
import os
from flask import Flask, request, jsonify
import traceback
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS
from flask_jwt_extended import create_access_token

from misc import config, db


# authentication
from pymongo import MongoClient
import hashlib
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
import urllib

from llamaapi import LlamaAPI
from langchain.chains import LLMChain
from langchain_experimental.llms import ChatLlamaAPI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import SystemMessage

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'cropsense'
jwt = JWTManager(app)
port = 5000
CORS(app)


svc_clf = joblib.load("../model/svm_best.pkl")
gnb_clf = joblib.load("../model/gnb_best.pkl")
knn_clf = joblib.load("../model/knn_best.pkl")
mongodb_util = db.db()

def predict(data, classifier):
    try:
        
        if classifier:
            print(classifier.__class__.__name__)
            # pass feature to pipeline and convert it to numerical data     
            prediction = classifier.predict([data])
            print(prediction[0])
            return str(prediction[0]), True
        else:
            print("Train the model first")
            return "No model here to use", False 
    except:
        return traceback.format_exc(), False

def ask_chatbot(question):
    try:
        # Top model prediction as a string.
        llama = LlamaAPI(os.environ.get('LLAMA_API_KEY'))
        template_messages = [
            SystemMessage(content="Act as if you are a expert in agriculture"),
            HumanMessagePromptTemplate.from_template("{text}"),
        ]
        prompt_template = ChatPromptTemplate.from_messages(template_messages)
        
        model = ChatLlamaAPI(client=llama)
        chain = LLMChain(llm=model, prompt=prompt_template)

        response = chain.run(
                text=question
        )
        
        return response, True
    except Exception as error:
        return error, False

@app.route('/auth/signin', methods=["POST"])
def login():
    user_info = request.json
    print(user_info['username'])
    user_from_db = mongodb_util.load_user(user_info['username'])
    if user_from_db:
        encrpted_password = hashlib.sha256(user_info['password'].encode("utf-8")).hexdigest()
        
        if encrpted_password == user_from_db['password']:

            access_token = create_access_token(identity=user_from_db['username'])
            print(access_token)
            return jsonify({'token': access_token}), 201
        
    return jsonify({'msg': 'The username or password is incorrect'}), 401


@app.route('/auth/signup', methods=["POST"])
def signup():
    user_info = request.json
    user_info["password"] = hashlib.sha256(user_info["password"].encode("utf-8")).hexdigest()
    
    doc = mongodb_util.load_user(user_info["username"])
    if not doc:
        # Creating user
        mongodb_util.add_user(user_info)
        access_token = create_access_token(identity=user_info["username"])
        print(access_token)
        return jsonify({'msg': 'User created successfully', 'token': access_token}), 201
    else:
        return jsonify({'msg': 'Username already exists'}), 409


@app.route("/")
def hello_world():
    return "Hello World!"

# use decorator pattern for the route
@app.route('/predict/svc', methods=["POST"])
def predictSVC():
    data = request.json
    result, status = predict(data, svc_clf)
    if status:
        return jsonify({'msg': 'Prediction done successfully', 'prediction': result}), 201
    else:
        return jsonify({'msg': result, 'prediction': ''}), 500

# use decorator pattern for the route
@app.route("/predict/gnb", methods=["POST"])
def predictGNB():
    data = request.json
    result, status = predict(data, gnb_clf)
    if status:
        return jsonify({'msg': 'Prediction done successfully', 'prediction': result}), 201
    else:
        return jsonify({'msg': result, 'prediction': ''}), 500
    
# use decorator pattern for the route
@app.route("/predict/knn", methods=["POST"])
def predictKNN():
    data = request.json
    result, status = predict(data, knn_clf)
    if status:
        return jsonify({'msg': 'Prediction done successfully', 'prediction': result}), 201
    else:
        return jsonify({'msg': result, 'prediction': ''}), 500



@app.route('/chatbot/ask', methods=["POST"])
def chatbot_ask():
    question = request.json
    response, status = ask_chatbot(question)
    print(response)
    if status:
        return jsonify({'msg': 'get result successfully', 'answer': response}), 201
    else:
        return jsonify({'msg': response, 'answer': ''}), 500


# print("Model loaded")
app.run(port=port)

flask_app =  app
# Create a test client using the Flask application configured for testing
