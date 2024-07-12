from flask import Flask,render_template,redirect,request,url_for
app=Flask(__name__)
from pymongo import MongoClient

client = MongoClient('mongodb+srv://20037741:sravas1234@cluster0.lvqco1z.mongodb.net/')

db = client['FabricLove']

class User:
    def __init__(self, name, email,password):
        self.name = name
        self.email = email
        self.password=password

    def save(self):
        user_dict = self.__dict__
        result = db.users.insert_one(user_dict)
        return result.inserted_id
    

@app.route("/collections")
def collectionsRoute():
    return render_template('collections.html')

@app.route("/")
def home():
    return render_template('mansection.html')

@app.route("/women")
def womensection():
    return render_template('womensection.html')


@app.route("/login")
def login():
    return render_template('loginpage.html')


@app.route("/register",methods=['GET','POST'])
def register():
    if request.method == 'POST':
        print('works')
        # Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        
        print(name,email,password)
        # result = db.users.insert_one({'name': name, 'email': email,password:password})
        # print(f"Inserted document ID: {result.inserted_id}")

        return render_template('registerpage.html')

    return render_template('registerpage.html')


if __name__ == "__main__":
    app.run(debug=True)