import json

# import requests
import boto3
from pickle import loads
from random import randint
import sklearn
from numpy import array
import os

def loadModel(key):
    s3client = boto3.client('s3')
    response = s3client.get_object(Bucket='model-bucket-restaurant-rating', Key=key)
    body = response['Body'].read()
    data = loads(body)
    return data

random_forest=loadModel('random_forest.sav')
naive_bayes=loadModel('naive_bayes.sav')
logistic_regression=loadModel('logistic_regression.sav')
svm=loadModel('svm.sav')
knn=loadModel('knn.sav')

modelList=[random_forest,knn]

def load_cuisines():
    s3client = boto3.client('s3')
    response = s3client.get_object(Bucket='cusines', Key='cuisines.json')
    body = response['Body'].read()
    data = json.loads(body)
    return data

def append_cusines_to_fields(fields,cuisinesList,parameters):
    cuisines=parameters['cuisines'].split(' ')
    for cuisine in cuisinesList:
        if cuisine in cuisines:
            fields.append(1)
        else:
            fields.append(0)


def lambda_handler(event, context):
    parameters=event['queryStringParameters'];
    print("Parameters",parameters)
# https://wpgay7f1u9.execute-api.us-east-1.amazonaws.com/Prod/predict?model=0&longitude=7&latitude=28.1234&average_cost_for_two=100&has_table_booking=1&has_online_delivery=1&is_delivering_now=1&switch_to_order_menu=1&price_range=1&votes=1000&cuisines=French%20Japanese
    fields=[
        parameters['longitude'],
        parameters['latitude'],
        parameters['average_cost_for_two'],
        parameters['has_table_booking'],
        parameters['has_online_delivery'],
        parameters['is_delivering_now'],
        parameters['switch_to_order_menu'],
        parameters['price_range'],
        parameters['votes']
    ];

    print("Field",fields)
    cuisines=load_cuisines()
    print("Cuisines",cuisines)
    append_cusines_to_fields(fields,cuisines,parameters)
    print("Fields after adding cuisines",fields)
    model=int(parameters['model'])
    print("Model",model)

    value=modelList[model].predict(array([fields]))
    
    print("Value",value)
    rating=str(value[0])
    print("Rating",rating)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "rating": rating,
        }),
    }
