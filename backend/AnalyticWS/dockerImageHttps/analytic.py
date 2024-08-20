import os
from tornado.ioloop import IOLoop
from tornado.web import Application, RequestHandler
from tornado.escape import json_decode
from pymongo import MongoClient
from bson import json_util
import json
from tornado.httpserver import HTTPServer

mongo_bdd = os.getenv('mongo_bdd')
mongo_bdd_server = os.getenv('mongo_bdd_server')
mongo_user = os.getenv('mongo_user')
mongo_password = os.getenv('mongo_password')
app_secret = os.getenv('app_secret')
allowed_app_name = os.getenv('allowed_app_name')

database_uri='mongodb://'+mongo_user+':'+mongo_password+'@'+ mongo_bdd_server +'/'
client = MongoClient(database_uri)
db = client[mongo_bdd]

class DefaultHandler(RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Allow-Methods', '*')

    def get(self):
        self.write({'response':'Administrador de Catálogos Operativo', 'status':200})


class ActionHandler(RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Allow-Methods', '*')
    
    def options(self, catalog, action):
        pass
    
    def post(self, catalog, action):
        content = json_decode(self.request.body)
        if (action == 'get_places_filtered'):
            filter = content['filter']
            output_model = content['output_model']
            respuesta = get_places_filtered(catalog, filter, output_model)
        self.write(respuesta)
        return

def get_places_filtered(catalog, filter, output_model):
    collection = db[catalog]
    output_model['_id'] = False
    output_model['item_id'] = True
    output_model['timestamp'] = True
    items = collection.find(filter, output_model)
    items_to_return = json.loads(json_util.dumps(items))
    return {'response':items_to_return, 'status':200}

def make_app():
    urls = [
        ("/", DefaultHandler),
        ("/([^/]+)/([^/]+)", ActionHandler)
    ]
    return Application(urls, debug=True)
  
if __name__ == '__main__':
    app = make_app()
    http_server = HTTPServer(app, ssl_options={
        "certfile": "/ssl/wildcard.chained.crt",
        "keyfile": "/ssl/privatekey.key",
    })
    http_server.listen(5050)    
    IOLoop.current().start()