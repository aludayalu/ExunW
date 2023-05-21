import flask
from flask import Flask,request
import requests,json,threading
apikey="76abe668f5d9062c178c775c3f4d41e4d8b2641a14d494a6de7c77e89bb6f7a6"
app=Flask(__name__)
rooms={}
def make_response(data):
    resp=flask.Response(data)
    resp.headers["Access-Control-Allow-Origin"]="*"
    resp.headers["Content-Type"]="application/json"
    return resp

@app.get("/get_room")
def main():
    global rooms
    args=dict(request.args)
    if "room" not in args:
        return ""
    args["room"]=args["room"].replace(" ","").strip()
    if args["room"] not in rooms:
        print("new")
        rooms[args["room"]]=["Welcome to "+" vs ".join(args["room"].split("vs"))]
    return make_response(json.dumps(rooms[args["room"]]))

@app.get("/add_room")
def add_room():
    global rooms
    args=dict(request.args)
    if "room" not in args or "data" not in args:
        return ""
    args["room"]=args["room"].replace(" ","").strip()
    if args["room"] not in rooms:
        rooms[args["room"]]=["Welcome to "+" vs ".join(args["room"].split("vs"))]
    rooms[args["room"]].append(args["data"])
    return make_response(json.dumps(True))

app.run(host="0.0.0.0",port=80,debug=True)