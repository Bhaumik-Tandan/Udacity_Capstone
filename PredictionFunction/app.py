import json

# import requests
import boto3
from pickle import loads
from random import randint
import sklearn
from numpy import array


def loadModel(key):
    s3client = boto3.client('s3')
    response = s3client.get_object(Bucket='model-bucket-restaurant-rating', Key=key)
    body = response['Body'].read()
    data = loads(body)
    return data

random_forest=loadModel('random_forest.sav')


def lambda_handler(event, context):
    parameters=event['queryStringParameters'];
    print("Parameters",parameters)

    field=[
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
    print("Field",field)

    for _ in range(148):
        fields.append(randint(0,1))
    print("Fields",fields)

    value=random_forest.predict(array([fields]))
    print("Value",value)
    rating=str(value[0])
    print("Rating",rating)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "rating": rating,
        }),
    }
