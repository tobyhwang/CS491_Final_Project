# Imports the Google Cloud client library
from google.cloud import datastore
import json

new_rating = 5

# Instantiates a client
datastore_client = datastore.Client('the-mixologist')

# The kind for the new entity
query = datastore_client.query(kind='Recipe')

query.add_filter('name', '=', 'A Furlong Too Late')
result = query.fetch()
print(result)


for res in result:

    print(int(res['rating'])/int(res['count']))

    # The name/ID for the new entity
    # name = 'vodka'
    # The Cloud Datastore key for the new entity
    task_key = datastore_client.key('Recipe', res.key.name)

    # Prepares the new entity
    task = datastore.Entity(key=task_key)
    print(res['name'])
    task.update({
        'name' : res['name'],
        'instructions' : res['instructions'],
        'rating': int(res['rating']) + new_rating,
        'count': int(res['count']) + 1,
    })

    for x in range(1, 16):
        task.update({
            'ingredient_' + str(x) : res['ingredient_' + str(x)].lower()
        })

    for x in range(1, 16):
        task.update({
            'measurement_' + str(x) : res['measurement_' + str(x)].lower()
        })

    # Saves the entity
    datastore_client.put(task)

