from flask import Flask, render_template
from jinja2 import ChoiceLoader, FileSystemLoader

app = Flask(__name__, static_folder='public', template_folder='public/sites')

# Umožní Flasku hledat šablony i v private/shared
app.jinja_loader = ChoiceLoader([
    FileSystemLoader('public/sites'),
    FileSystemLoader('private/shared')
])

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
