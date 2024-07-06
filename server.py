from flask import Flask,render_template

app=Flask(__name__)




@app.route("/")
def home():
    return render_template('mansection.html')

@app.route("/women")
def womensection():
    return render_template('womensection.html')

if __name__ == "__main__":
    app.run(debug=True)