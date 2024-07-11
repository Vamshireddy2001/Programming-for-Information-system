from flask import Flask,render_template
app=Flask(__name__)



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


@app.route("/register")
def register():
    return render_template('registerpage.html')


if __name__ == "__main__":
    app.run(debug=True)