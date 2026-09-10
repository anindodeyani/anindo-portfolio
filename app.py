from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/studyhub")
def studyhub():
    categories = [
        {
            "title": "Digital Logic Design",
            "count": 6,
            "image": "images/previews/dld.jpg",
        },
        {
            "title": "Java Programming",
            "count": 4,
            "image": None,
        },
        {
            "title": "Mathematics",
            "count": 5,
            "image": "images/previews/math.jpg",
        },
    ]
    return render_template("studyhub.html", categories=categories)

if __name__ == "__main__":
    app.run(debug=True)