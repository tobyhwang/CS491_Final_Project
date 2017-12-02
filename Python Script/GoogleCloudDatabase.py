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

    # Prepares the new entity
    task = datastore.Entity(key=task_key)
    task.update({
        'name' : drink[0]['strDrink'],
        'instructions' : drink[0]['strInstructions'],
        'ingredient_1' : drink[0]['strIngredient1'],
        'ingredient_2' : drink[0]['strIngredient2'],
        'ingredient_3' : drink[0]['strIngredient3'],
        'ingredient_4' : drink[0]['strIngredient4'],
        'ingredient_5' : drink[0]['strIngredient5'],
        'ingredient_6' : drink[0]['strIngredient6'],
        'ingredient_7' : drink[0]['strIngredient7'],
        'ingredient_8' : drink[0]['strIngredient8'],
        'ingredient_9' : drink[0]['strIngredient9'],
        'ingredient_10' : drink[0]['strIngredient10'],
        'ingredient_11' : drink[0]['strIngredient11'],
        'ingredient_12' : drink[0]['strIngredient12'],
        'ingredient_13' : drink[0]['strIngredient13'],
        'ingredient_14' : drink[0]['strIngredient14'],
        'ingredient_15' : drink[0]['strIngredient15'],
        'measurement_1' : drink[0]['strMeasure1'],
        'measurement_2' : drink[0]['strMeasure2'],
        'measurement_3' : drink[0]['strMeasure3'],
        'measurement_4' : drink[0]['strMeasure4'],
        'measurement_5' : drink[0]['strMeasure5'],
        'measurement_6' : drink[0]['strMeasure6'],
        'measurement_7' : drink[0]['strMeasure7'],
        'measurement_8' : drink[0]['strMeasure8'],
        'measurement_9' : drink[0]['strMeasure9'],
        'measurement_10' : drink[0]['strMeasure10'],
        'measurement_11' : drink[0]['strMeasure11'],
        'measurement_12' : drink[0]['strMeasure12'],
        'measurement_13' : drink[0]['strMeasure13'],
        'measurement_14' : drink[0]['strMeasure14'],
        'measurement_15' : drink[0]['strMeasure15'],
    })

    # Saves the entity
    datastore_client.put(task)

    print('Saved ' + str(id))
