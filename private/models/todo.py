import private.database as database
class Todo:
    def __init__(self, id, todo_work, important, is_check):
        self.id = id
        self.todo_work = todo_work
        self.important = important
        self.is_check = is_check

    def create(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass

    # def get_all():
    #     query = "SELECT * FROM todo"
    #     returns = database.execute(query)
    #     print(returns)
    #     new_todo = Todo(returns[0][0], returns[0][1], returns[0][2], returns[0][3])
    #     return returns
    @staticmethod
    def get_all():
        query = "SELECT * FROM todo"
        results = database.execute(query)
        return [Todo(**row) for row in results]