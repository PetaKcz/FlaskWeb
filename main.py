from flask import Flask, render_template, request, redirect, url_for
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
    action = request.form.get('action')

    if request.method == 'POST':

        if action == 'delete':
            item_id = request.form.get('delete_id')
            todo.Todo(id = item_id).delete()

        elif action == 'create':    
            name = request.form.get('name')
            important = request.form.get('important')
            is_check = request.form.get('is_check')
            if is_check == 'on':
                is_check = "True"
            else:
                is_check = "False"
            todo.Todo(todo_work = name, important = important, is_check = is_check).create()

        elif action == 'update':
            update_id = request.form.get('update_id')
            name = request.form.get('name')
            important = request.form.get('important')
            is_check = 'True' if request.form.get('is_check') == 'on' else 'False'
            todo.Todo(id=update_id, todo_work=name, important=important, is_check=is_check).update()
        

        return redirect(url_for('home'))
    all_todos = todo.Todo.get_all()  # Zavoláme metodu přímo
    #print(todo.Todo.get_all())
    return render_template("index.html", todos=all_todos)
    #return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
