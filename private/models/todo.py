import private.database as database
class Todo:
    def __init__(self, id = "", todo_work = "", important = "", is_check = ""):
        self.id = id
        self.todo_work = todo_work
        self.important = important
        self.is_check = is_check

    @staticmethod
    def get_all():
        query = "SELECT * FROM todo"
        results = database.execute(query)
        return [Todo(**row) for row in results]

    
    def create(self):
        query = "INSERT INTO todo (todo_work, important, is_check) VALUES (%s, %s, %s);"
        values = (self.todo_work, self.important, self.is_check)
        return database.execute(query, values, fetch=False)

    def delete(self):
        query = "DELETE FROM todo WHERE id = (%s);"
        values = (self.id,)
        return database.execute(query, values, fetch=False)

    def update(self):
        query = "UPDATE todo SET todo_work = %s, important = %s, is_check = %s WHERE id = %s"
        values = (self.todo_work, self.important, self.is_check, self.id)
        return database.execute(query, values, fetch=False)
