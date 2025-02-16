import mysql.connector as c

# Načtení konfigurace z db_settings.txt
settings = {}

with open("settings.txt") as f:
    for line in f:
        key, value = line.strip().split("=")
        settings[key] = value

# Připojení k databázi
mydb = c.connect(
    host=settings["host"],
    user=settings["user"],
    password=settings["password"],
    database=settings["database"]
)



def execute(query):
    mycursor = mydb.cursor()
    mycursor.execute(query)
    myresult = mycursor.fetchall()
    return myresult