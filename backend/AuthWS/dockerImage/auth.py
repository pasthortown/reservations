import os
from tornado.ioloop import IOLoop
from tornado.web import Application, RequestHandler
from tornado.escape import json_decode
from pymongo import MongoClient
import datetime
from bson import json_util
import json
import uuid
import jwt
from dateutil import parser
import random
import string
import mailer
from argon2 import PasswordHasher

mongo_bdd = os.getenv('mongo_bdd')
mongo_bdd_server = os.getenv('mongo_bdd_server')
mongo_user = os.getenv('mongo_user')
mongo_password = os.getenv('mongo_password')
app_secret = os.getenv('app_secret')
allowed_app_name = os.getenv('allowed_app_name')
web_url = os.getenv('web_url')
recovery_url = os.getenv('recovery_url')
token_live = os.getenv('token_live')
recovery_token_live = os.getenv('recovery_token_live')
password_length = os.getenv('password_length')
max_login_tries = os.getenv('max_login_tries')
smtp_server = os.getenv('smtp_server')
smtp_port = os.getenv('smtp_port')
smtp_tls = os.getenv('smtp_tls')
smtp_user = os.getenv('smtp_user')
smtp_password = os.getenv('smtp_password')

database_uri='mongodb://'+mongo_user+':'+mongo_password+'@'+ mongo_bdd_server +'/'
client = MongoClient(database_uri)
db = client[mongo_bdd]

catalog = 'users'

class DefaultHandler(RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Allow-Methods', '*')

    def get(self):
        self.write({'response':'Servicio de Autenticación Operativo', 'status':200})

class ActionHandler(RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Allow-Methods', '*')

    def options(self, action):
        pass
    
    def post(self, action):
        content = json_decode(self.request.body)
        if (action == 'update_user'):
            attribute = content['attribute']
            value = content['value']
            email = content['email']
            userdata = content['userdata']
            respuesta = update_user(attribute, value, email, userdata)
        if (action == 'login'):
            email = content['email']
            password = content['password']
            respuesta = login(email, password)
        if (action == 'register'):
            email = content['email']
            userdata = content['userdata']
            respuesta = register(email, userdata)
        if (action == 'recovery'):
            email = content['email']
            respuesta = recovery(email)
        self.write(respuesta)
        return

class AdminUsersActionHandler(RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Allow-Methods', '*')

    def options(self, action):
        pass

    def post(self, action):
        content = json_decode(self.request.body)
        headers = self.request.headers
        token = headers['token']
        auth = validate_token(token)
        if auth == False:
            self.write({'response':'Acceso Denegado', 'status':'500'})
            return
        if (action == 'get_users'):
            output_model = content['output_model']
            respuesta = get_users(catalog, output_model)
        if (action == 'update_user_data'):
            item_id = content['item_id']
            userdata = content['userdata']
            respuesta = update_user_data(catalog, item_id, userdata)
        if (action == 'lock_user'):
            item_id = content['item_id']
            respuesta = lock_user(catalog, item_id)
        if (action == 'unlock_user'):
            item_id = content['item_id']
            respuesta = unlock_user(catalog, item_id)
        self.write(respuesta)
        return

def update_user(attribute, value, email, userdata):
    collection = db[catalog]
    filter = {}
    filter[attribute] = value
    prev_users = collection.find(filter)
    previous_users = json.loads(json_util.dumps(prev_users))
    if (len(previous_users) == 0):
        return {'response': 'Los datos proporcionados no se encuentran asociado a cuenta alguna', 'status':500}
    else:
        userdata['timestamp'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        userdata['login_tries'] = 0
        userdata['active'] = True
        userdata['disabled'] = False
        collection.update_one(filter, {'$set':userdata})
        send_email_register('Actualización o Recuperación de Cuenta', userdata)
    return {'response': 'Usuario actualizado satisfactoriamente', 'status':200}

def do_login(email):
    collection = db[catalog]
    filter = {"email":email}
    users = collection.find(filter)
    for user in users:
        disabled = user['disabled']
        if (disabled == True):
            return {'response': 'La cuenta ha sido bloqueada por el administrador', 'userdata':'', 'token':'', 'status':500}
        update_query = { "$set": { 'login_tries': 0 } }
        collection.update_one(filter, update_query)
        user.pop('password',None)
        user_to_return = json.loads(json_util.dumps(user))
        return {'response':'Usuario Autorizado', 'userdata': user_to_return, 'token':generate_token(), 'status':200}        
    return {'response': 'Usuario no Autorizado', 'userdata': '', 'token':'', 'status':500}

def login(email, password):
    collection = db[catalog]
    filter = {"email":email}
    users = collection.find(filter)
    for user in users:
        disabled = user['disabled']
        if (disabled == True):
            return {'response': 'La cuenta ha sido bloqueada por el administrador', 'userdata':'', 'token':'', 'status':500}
        active = user['active']
        if (active == False):
            return {'response': 'Ha excedido el número de intentos, la cuenta ha sido bloqueada', 'userdata':'', 'token':'', 'status':500}
        if (password == user['password']):
            update_query = { "$set": { 'login_tries': 0 } }
            collection.update_one(filter, update_query)
            user.pop('password',None)
            user_to_return = json.loads(json_util.dumps(user))
            return {'response':'Usuario Autorizado', 'userdata': user_to_return, 'token':generate_token(), 'status':200}
        else:
            login_tries = int(user['login_tries']) + 1
            if (int(login_tries) < int(max_login_tries)):
                update_query = { "$set": { 'login_tries': login_tries, 'active': True } }
                collection.update_one(filter, update_query)
                return {'response': 'Usuario no Autorizado, Intentos: ' + str(login_tries), 'userdata':'', 'token':'', 'status':500}
            else:
                update_query = { "$set": { 'login_tries': int(max_login_tries), 'active': False } }
                collection.update_one(filter, update_query)
                return {'response': 'Ha excedido el número de intentos, la cuenta ha sido bloqueada', 'userdata':'', 'token':'', 'status':500}            
    return {'response': 'Usuario no Autorizado', 'userdata': '', 'token':'', 'status':500}

def register(email, userdata):
    collection = db[catalog]
    filter = {"email":email}
    prev_users = collection.find(filter)
    previous_users = json.loads(json_util.dumps(prev_users))
    if (len(previous_users)>0):
        return {'response': 'El Correo Electrónico se encuentra asociado a otra cuenta', 'status':500}
    else:
        item_id = str(uuid.uuid4())
        userdata['item_id'] = item_id
        userdata['timestamp'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        userdata['email'] = email
        userdata['login_tries'] = 0
        userdata['active'] = True
        userdata['disabled'] = False
        collection.insert_one(userdata)
        send_email_register('Creación de Cuenta', userdata)
    return {'response': 'Datos Registrados, la Constraseña ha sido enviada al Correo Electrónico', 'status':200}

def get_user(catalog, item_id, output_model):
    collection = db[catalog]
    output_model['_id'] = False
    output_model['item_id'] = True
    output_model['timestamp'] = True
    if 'password' in output_model:
        output_model.pop('password',None)
    filter = {"item_id":item_id}
    items = collection.find(filter, output_model)
    items_to_return = json.loads(json_util.dumps(items))
    if (len(items_to_return)>0):
        toReturn = items_to_return[0]
        status = 200
    else:
        toReturn = 'Elemento no encontrado'
        status = 500
    return {'response':toReturn, 'status':status}

def get_users(catalog, output_model):
    collection = db[catalog]
    output_model['_id'] = False
    output_model['item_id'] = True
    output_model['timestamp'] = True
    if 'password' in output_model:
        output_model.pop('password',None)
    items = collection.find({}, output_model)
    items_to_return = json.loads(json_util.dumps(items))
    return {'response':items_to_return, 'status':200}

def update_user_data(catalog, item_id, userdata):
    collection = db[catalog]
    filter = {"item_id":item_id}
    prev_users = collection.find(filter)
    previous_users = json.loads(json_util.dumps(prev_users))
    if (len(previous_users) == 0):
        return {'response': 'Los datos proporcionados no se encuentran asociado a cuenta alguna', 'status':500}
    else:
        userdata['timestamp'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        userdata['login_tries'] = 0
        userdata['active'] = True
        userdata['disabled'] = False
        collection.update_one(filter, {'$set':userdata})
    return {'response': 'Usuario actualizado satisfactoriamente', 'status':200}

def recovery(email):
    collection = db[catalog]
    filter = {"email":email}
    prev_users = collection.find(filter)
    previous_users = json.loads(json_util.dumps(prev_users))
    if (len(previous_users)==0):
        return {'response': 'El Correo Electrónico no se encuentra asociado a cuenta alguna', 'status':500}
    else:
        for user in previous_users:
            send_email_recovery('Recuperación de Cuenta', user)
            return {'response': 'Solicitud de recuperación de cuenta procesada', 'status':200}

def lock_user(catalog, item_id):
    collection = db[catalog]
    filter = {"item_id":item_id}
    prev_users = collection.find(filter)
    previous_users = json.loads(json_util.dumps(prev_users))
    if (len(previous_users) == 0):
        return {'response': 'Los datos proporcionados no se encuentran asociado a cuenta alguna', 'status':500}
    else:
        user = {}
        user['timestamp'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        user['disabled'] = True
        collection.update_one(filter, {'$set':user})
    return {'response': 'Usuario bloqueado satisfactoriamente', 'status':200}

def unlock_user(catalog, item_id):
    collection = db[catalog]
    filter = {"item_id":item_id}
    prev_users = collection.find(filter)
    previous_users = json.loads(json_util.dumps(prev_users))
    if (len(previous_users) == 0):
        return {'response': 'Los datos proporcionados no se encuentran asociado a cuenta alguna', 'status':500}
    else:
        user = {}
        user['timestamp'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        user['disabled'] = False
        collection.update_one(filter, {'$set':user})
    return {'response': 'Usuario desbloqueado satisfactoriamente', 'status':200}

def generate_token():
    exp_time = datetime.datetime.now() + datetime.timedelta(minutes=int(token_live))
    payload = { 'app_name':allowed_app_name, 'valid_until': str(exp_time) }
    return jwt.encode(payload, app_secret, algorithm='HS256')
    
def validate_token(token):
    try:
        data = jwt.decode(token, app_secret, algorithms=['HS256'])
        exp_time = parser.parse(data['valid_until'])
        app_name = data['app_name']
        if (app_name == allowed_app_name):
            if (datetime.datetime.now() < exp_time):
                return {'response':data, 'status':200}
            else:
                return {'response':'Token Expirado', 'status':500}
        else:
            return {'response':'Token Erroneo', 'status':500}
    except:
        return {'response':'Token Erroneo', 'status':500}

def send_email_register(subject, user):
    params = user
    params['app_name']=allowed_app_name
    params['web_url']=web_url
    to = [user['email']]
    template = 'register_account.html'
    if (subject == 'Actualización o Recuperación de Cuenta'):
        template = 'update_account.html'
    mailer.send_mail(
        smtp_server,
        smtp_port,
        int(smtp_tls),
        smtp_user,
        smtp_password,
        allowed_app_name,
        to,
        subject,
        template,
        params,
        [])

def send_email_recovery(subject, user):
    params = user
    params['app_name']=allowed_app_name
    params['web_url']=web_url
    to = [user['email']]
    mailer.send_mail(
        smtp_server,
        smtp_port,
        int(smtp_tls),
        smtp_user,
        smtp_password,
        allowed_app_name,
        to,
        subject,
        'password_recovery.html',
        params,
        [])

def send_email_reset(subject, user):
    params = user
    params['app_name']=allowed_app_name
    params['web_url']=web_url
    to = [user['email']]
    mailer.send_mail(
        smtp_server,
        smtp_port,
        int(smtp_tls),
        smtp_user,
        smtp_password,
        allowed_app_name,
        to,
        subject,
        'reset_password.html',
        params,
        [])

def make_app():
    urls = [
        ("/", DefaultHandler),
        ("/([^/]+)", ActionHandler),
        ("/admin/users/([^/]+)", AdminUsersActionHandler)
    ]
    return Application(urls, debug=True)
  
if __name__ == '__main__':
    app = make_app()
    app.listen(5050)
    IOLoop.instance().start()