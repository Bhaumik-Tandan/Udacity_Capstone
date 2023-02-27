import json

# import requests
import boto3
from pickle import loads
from random import randint
import sklearn


# def getObjectFromsS3(key):
#     s3 = boto3.resource('s3')
#     obj = s3.Object('model-bucket-restaurant-rating', key)
#     return obj.get()

# random_forest_file = getObjectFromsS3('random_forest.sav')
# random_forest=load(random_forest_file['Body'].read())
def loadModel(key):
    s3client = boto3.client('s3')
    response = s3client.get_object(Bucket='model-bucket-restaurant-rating', Key=key)
    body = response['Body'].read()
    data = loads(body)
    return data

random_forest=loadModel('random_forest.sav')


def lambda_handler(event, context):
    fields=[23,43,200,1,0,1,1,300,200]
    for _ in range(148):
        fields.append(randint(0,1))
    print("Fields",fields)

    value=random_forest.predict(fields)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": value,
        }),
    }
