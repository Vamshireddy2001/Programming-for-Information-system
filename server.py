from flask import Flask,render_template,redirect,request,url_for,flash,jsonify,session
app=Flask(__name__)
from pymongo import MongoClient

client = MongoClient('mongodb+srv://20037741:sravas1234@cluster0.lvqco1z.mongodb.net/')

db = client['FabricLove']
app.secret_key = '12345'
class User:
    def __init__(self, name, email,password):
        self.name = name
        self.email = email
        self.password=password

    def save(self):
        user_dict = self.__dict__
        result = db.users.insert_one(user_dict)
        return result.inserted_id

product_collection = db['products']    
@app.route('/add_products', methods=['POST'])
def add_products():
    ProductCollection = [
        {"name": "A Field Of Memories", "price": "$100", "imgpath": "static/images/coll1.jpg"},
        {"name": "Baby Bloom", "price": "$130", "imgpath": "static/images/coll12.jpg"},
        {"name": "Be Merry", "price": "$80", "imgpath": "static/images/coll13.jpg"},
        {"name": "Beach Travel", "price": "$90", "imgpath": "static/images/coll14.jpg"},
        {"name": "Birds and Bobbins", "price": "$110", "imgpath": "static/images/coll15.jpg"},
        {"name": "Blue Skies and Nutmeg", "price": "$130", "imgpath": "static/images/coll17.jpg"},
        {"name": "British Waterways", "price": "$80", "imgpath": "static/images/coll18.jpg"},
        {"name": "Butterfly Dreams", "price": "$90", "imgpath": "static/images/coll10.jpg"},
        {"name": "Cutest Little Elephant Blue", "price": "$120", "imgpath": "static/images/coll11.jpg"},
        {"name": "Cutest Little Elephant Pink", "price": "$110", "imgpath": "static/images/coll12.jpg"},
    ]
    
    result = product_collection.insert_many(ProductCollection)
    return jsonify({"message": f"Inserted {len(result.inserted_ids)} documents into the products collection."}), 200


@app.route("/collections")
def collectionsRoute():
    if('user' in session):
       return render_template('collections.html',login=True)
    return render_template('collections.html',login=False)


@app.route("/brands")
def brands():
    if('user' in session):
       return render_template('brands.html',login=True)
    return render_template('brands.html',login=False)


@app.route("/cart")
def cart():
    if('user' in session):
       return render_template('cart.html',login=True)
    return render_template('cart.html',login=False)

@app.route('/savecollection',methods=['GET','POST'])
def savecollection():
    if(request.method=='POST'):
        name=request.args.get('name')
        imgpath=request.args.get('imgpath')
        price=request.args.get('price')
        db.products.insert_one({"name":name,"imgpath":imgpath,"price":price})
        return "saved collection!"


@app.route("/")
def home():
    if('user' in session):
            return render_template('mansection.html',login=True)
    return render_template('mansection.html',login=False)

@app.route("/search/<ID>")
def search(ID):
    return jsonify({"ID":ID})


@app.route("/women")
def womensection():
    if('user' in session):
        return render_template('womensection.html',login=True)
    return render_template('womensection.html',login=False)

@app.route("/logout")
def logout():
    if('user' in session):
        session.pop('user',None)
        return render_template('loginpage.html',login=False)
    


@app.route("/login",methods=['GET','POST'])
def login():
       if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        message=CheckForNamesLogin(email,password)
        if(message):
           return render_template('loginpage.html',message=message)
        else:
             user=db.users.find_one({'email': email})
       
             if user :
                if(user['password']==password):
                   user['_id'] = str(user['_id'])
                   session['user'] = user

                   return redirect('/')
                else:
                   return render_template('loginpage.html',message="Password not correct!")
             else:
                return render_template('loginpage.html',message="Email id not resgitered registered")
       return render_template('loginpage.html',message="")



@app.route("/register",methods=['GET','POST'])
def register():
    if request.method == 'POST':
        # Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        confirmPassword = request.form.get('confirmpassword')

        message=CheckForNames(name,email,password,confirmPassword)
        if(message):
           return render_template('registerpage.html',message=message)
        else:
             if db.users.find_one({'email': email}):
                return render_template('registerpage.html',message="User already registered!")
             else:
                result = db.users.insert_one({'name': name, 'email': email,'password':password})
                return render_template('registerpage.html',message="Kindly login! User successfully registered")
         
    return render_template('registerpage.html')

def CheckForNamesLogin(email,password):
    if(email==""):
        return ('email not be blank')
        
    elif(password==""):
        return('password not be blank')
        

def CheckForNames(name,email,password,confirmpassword):
    if(name==""):
        return 'name not be blank!'
    elif(email==""):
        return ('email not be blank')
        
    elif(password==""):
        return('password not be blank')
        
    elif(confirmpassword!=password):
        return('password not match!')
        

if __name__ == "__main__":
    app.run(debug=True)