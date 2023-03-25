from json import dump
from pickle import load
import os

parent_dir=os.path.abspath(os.path.join(os.getcwd(), os.pardir))

with open(os.path.join(parent_dir,"cuisines"+'.txt'),'rb') as f:
        cuisines=load(f)

cuisines_json={"list":[]}

for index,i in enumerate(cuisines):
    cuisines_json["list"].append({"name":i,"id":index})


src=os.path.join("src","form","cuisines.json")

dump(cuisines_json, open(src, "w"), indent = 6)