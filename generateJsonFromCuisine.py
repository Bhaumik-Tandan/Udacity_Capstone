from pickle import load
import json

def load_cuisines():

    with open("cuisines.txt",'rb') as f:
        cuisines=load(f)

    return cuisines

cuisines=load_cuisines()

def generate_json_from_cuisines(cuisines):
    cuisines=list(cuisines)
    print(cuisines)
    with open("cuisines.json",'w') as f:
        json.dump(cuisines,f)



generate_json_from_cuisines(cuisines)