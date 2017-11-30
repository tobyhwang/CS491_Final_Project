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
        'instructions' : str(drink[0]['strInstructions']),
        'ingredient_1' : str((drink[0]['strIngredient1'], drink[0]['strMeasure1'])),
        'ingredient_2' : str((drink[0]['strIngredient2'], drink[0]['strMeasure2'])),
        'ingredient_3' : str((drink[0]['strIngredient3'], drink[0]['strMeasure3'])),
        'ingredient_4' : str((drink[0]['strIngredient4'], drink[0]['strMeasure4'])),
        'ingredient_5' : str((drink[0]['strIngredient5'], drink[0]['strMeasure5'])),
        'ingredient_6' : str((drink[0]['strIngredient6'], drink[0]['strMeasure6'])),
        'ingredient_7' : str((drink[0]['strIngredient7'], drink[0]['strMeasure7'])),
        'ingredient_8' : str((drink[0]['strIngredient8'], drink[0]['strMeasure8'])),
        'ingredient_9' : str((drink[0]['strIngredient9'], drink[0]['strMeasure9'])),
        'ingredient_10' : str((drink[0]['strIngredient10'], drink[0]['strMeasure10'])),
        'ingredient_11' : str((drink[0]['strIngredient11'], drink[0]['strMeasure11'])),
        'ingredient_12' : str((drink[0]['strIngredient12'], drink[0]['strMeasure12'])),
        'ingredient_13' : str((drink[0]['strIngredient13'], drink[0]['strMeasure13'])),
        'ingredient_14' : str((drink[0]['strIngredient14'], drink[0]['strMeasure14'])),
        'ingredient_15' : str((drink[0]['strIngredient15'], drink[0]['strMeasure15'])),
    })

    # Saves the entity
    datastore_client.put(task)

    print('Saved ' + str(id))
