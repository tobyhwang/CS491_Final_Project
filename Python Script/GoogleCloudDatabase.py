# Imports the Google Cloud client library
from google.cloud import datastore
import json

# Instantiates a client
datastore_client = datastore.Client('the-mixologist')

# The kind for the new entity
kind = 'Recipe'

# read in the entire csv
groupDrinks = []

fo = open("recipes.txt", "r")

for line in fo.readlines():
    groupDrinks.append(json.loads(line.strip())['drinks'])



# get the drink id
for drink in groupDrinks:
    id = drink[0]['idDrink']

    # The name/ID for the new entity
    # name = 'vodka'
    # The Cloud Datastore key for the new entity
    task_key = datastore_client.key(kind, id)

    # Prepares the new entity and upload all the information
    task = datastore.Entity(key=task_key)
    task.update({
        'name' : drink[0]['strDrink'],
        'instructions' : drink[0]['strInstructions'],
        'rating': 0,
        'count': 0
    })

    # upload all the ingredients
    for x in range(1, 16):
        if drink[0]['strIngredient' + str(x)] == ' ' or drink[0]['strIngredient' + str(x)] is None or drink[0]['strIngredient' + str(x)] == 'null':
            task.update({
                'ingredient_' + str(x) : ''
            })
        else:
            task.update({
                'ingredient_' + str(x) : drink[0]['strIngredient' + str(x)].lower()
            })

    # upload all the measurements
    for x in range(1, 16):
        if drink[0]['strMeasure' + str(x)] == ' ' or drink[0]['strMeasure' + str(x)] is None or drink[0]['strMeasure' + str(x)] == 'null':
            task.update({
                'measurement_' + str(x) : ''
            })
        else:
            task.update({
                'measurement_' + str(x) : drink[0]['strMeasure' + str(x)].lower()
            })

    # Saves the entity
    datastore_client.put(task)

    print('Saved ' + str(id))
