from decouple import config

CLIENT_ID = config('CLIENT_ID',default='')
CLIENT_SECRET = config('CLIENT_SECRET',default='')
REDIRECT_URI = config('REDIRECT_URI',default='')

print(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)