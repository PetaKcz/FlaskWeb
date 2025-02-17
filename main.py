from flask import Flask, render_template, request
from jinja2 import ChoiceLoader, FileSystemLoader


import private.models.todo as todo
import private.database as database

app = Flask(__name__, static_folder='public', template_folder='public/sites')

# Umožní Flasku hledat šablony i v private/shared
app.jinja_loader = ChoiceLoader([
    FileSystemLoader('public/sites'),
    FileSystemLoader('private/shared'),
    FileSystemLoader('private/models')
])

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        name = request.form.get('name')
        important = request.form.get('important')
        is_check = request.form.get('is_check')
        if is_check == 'on':
            is_check = "True"
        else:
            is_check = "False"
        todo.Todo(todo_work = name, important = important, is_check = is_check).create()

    all_todos = todo.Todo.get_all()  # Zavoláme metodu přímo
    #print(todo.Todo.get_all())
    return render_template("index.html", todos=all_todos)
    #return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
