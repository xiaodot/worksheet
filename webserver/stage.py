import sys
import json
import os

filename = "stage"

def readall():
	fd = open(filename)
	res = "["
	lines = fd.readlines()
	res += ",".join(lines)
	res += "]"
	fd.close()

	return json.loads(res)

def find(id):
	for item in readall():
		if item["id"] == id:
			return item
	return None

def write(str):
	fd = open(filename, "w")
	fd.write(str)
	fd.close()

def update(nv):
	data = readall()
	for item in data:
		flag = False
		if item["id"] == nv["id"]:
			flag = True
			for key in item:
				item[key] = nv[key]
		if flag == True:
			break

	str = json.dumps(data)
	write(str)		

print json.dumps(find("01"))