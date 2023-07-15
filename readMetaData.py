from urllib.parse import urlparse
import json
import os
import psycopg2 as psycopg2
from dotenv import load_dotenv


load_dotenv()
db_url = os.environ.get('DB_URL')
result = urlparse(db_url)
username = result.username
password = result.password
database = result.path[1:]
hostname = result.hostname
port = result.port
connection = psycopg2.connect(
    database=database,
    user=username,
    password=password,
    host=hostname,
    port=port
)

with connection:
    cur = connection.cursor()
    cur.execute("""SELECT table_name, is_insertable_into FROM information_schema.tables
        WHERE table_schema = 'public'""")

    rows = cur.fetchall()

    for i in range(len(rows)):
        if rows[i][1] == "YES":
            print(rows[i][0], '-', i)

    c = -1
    while c >= len(rows) or c < 0:
        c = int(input())

    selected_table = rows[c][0]
    quote = "'"
    command = "SELECT column_name, column_default, data_type, is_nullable, character_maximum_length, is_generated FROM information_schema.columns WHERE table_name = " + quote + selected_table + quote
    cur.execute(command)

    columns = cur.fetchall()

    command = """
       SELECT conname, conrelid::regclass AS table_name, a.attname AS column_name,
              conrelid::regclass || '.' || a.attname AS full_column_name,
              confrelid::regclass AS foreign_table_name, af.attname AS foreign_column_name,
              confrelid::regclass || '.' || af.attname AS full_foreign_column_name
       FROM pg_constraint c
       JOIN pg_attribute a ON a.attnum = ANY(c.conkey) AND a.attrelid = c.conrelid
       JOIN pg_attribute af ON af.attnum = ANY(c.confkey) AND af.attrelid = c.confrelid
       WHERE contype = 'f'
       """

    cur.execute(command)
    relations = cur.fetchall()

    MetaData = dict()
    MetaData["table_name"] = selected_table
    MetaData["columns"] = dict()
    for col in columns:
        MetaData["columns"][col[0]] = dict()
        MetaData["columns"][col[0]]["column_name"] = col[0]
        MetaData["columns"][col[0]]["column_default"] = col[1]
        MetaData["columns"][col[0]]["data_type"] = col[2]
        MetaData["columns"][col[0]]["is_nullable"] = col[3]
        MetaData["columns"][col[0]]["character_maximum_length"] = col[4]
        MetaData["columns"][col[0]]["is_generated"] = col[5]

    for relation in relations:
        conname, table_name, column_name, full_column_name, foreign_table_name, foreign_column_name, full_foreign_column_name = relation
        if table_name == selected_table:
            MetaData["columns"][column_name]["connected_with"] = [{"table_name": foreign_table_name, "column_name": foreign_column_name}]

        if foreign_table_name == selected_table:
            MetaData["columns"][column_name]["related_to"] = [{"table_name": table_name, "column_name": column_name}]

    with open('json_data.json', 'w') as json_file:
        json.dump(MetaData, json_file)

