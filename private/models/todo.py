import private.database as database
class Todo:
    def __init__(self, id, title, importance, completed):
        self.id = id
        self.title = title
        self.importance = importance
        self.completed = completed

    def create(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass

    def get_all():
        query = "SELECT * FROM todo"
        returns = database.execute(query)
        return returns