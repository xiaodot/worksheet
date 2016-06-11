import sys
import json
import os

filename = "dataset"

def readall():
	fd = open(filename)
	lines = fd.readlines()
	res = ",".join(lines)
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

def add(item):
	data = readall()
	data.append(item)

def remove(id):
	data = readall()
	for item in data:
		if item["id"] == id:
			data.remove(item)
	write(json.dumps(data))
	