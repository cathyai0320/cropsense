from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import MongoClient
from urllib.parse import quote_plus

class db:
    def __init__(self):
        self.db = self.get_mongo_client()
        self.load_users()

    def get_mongo_client(self):
        username = quote_plus('cropsense_admin')
        password = quote_plus('uam8vSNjokiRTub6')
        cluster = 'myfirstcluster.rwgrtyi.mongodb.net'
        appname = 'Myfirstcluster'
        dbname = 'cropsense'
        uri = 'mongodb+srv://' + username + ':' + password + '@' + cluster + '/?retryWrites=true&w=majority&appName=' + appname
        
        try:
            client = MongoClient(
                uri, 
                server_api=ServerApi('1'))
            return client.get_database(dbname)         
        except Exception as e:
            return  None
        
    def load_users(self):
        self.users = self.db['users']
    
    def load_user(self, username):
        return self.users.find_one({'username': username})
    
    def add_user(self, user):
        self.users.insert_one(user)
    
    def update_user(self, user):
        self.users.update_one({'username': user['username']}, {"$set": user}) 
    
    def delete_user(self, username):
        self.users.delete_one({'username': username})
    