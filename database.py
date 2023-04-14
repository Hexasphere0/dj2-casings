import sqlite3;

con = sqlite3.connect("recipes.db")

cur = con.cursor()

cur.execute("CREATE TABLE test(hello, no, yes)")

res = cur.execute("SELECT name FROM sqlite_master")
print(res.fetchone())