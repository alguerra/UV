import math
import datetime
import time
import sqlite3
import os


dicionario = {
    "a": 1,
    "b": 2,
    "c": 3
}
s = "teste com string"
b = "Outra string de texto"

con = sqlite3.connect("db")
cur = con.cursor()
print(type(cur))



#for i in s:
    #print(i)
    #time.sleep(1)

f = 18.2
print(type(f))

#lst = [1,2,3,4,5,6]

#print(max(lst))
