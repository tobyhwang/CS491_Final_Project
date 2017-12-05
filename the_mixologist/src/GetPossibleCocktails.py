# Imports the Google Cloud client library
from google.cloud import datastore
import json
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def create_client(project_id):
    return datastore.Client(project_id)


def elgible_drinks(ingredients, query):

    drinks = {}
    client = create_client('the-mixologist')

    # store every drink ina dict that has all those ingredients
    for ingredient in ingredients:
        for i in range(1, 16):
            query.add_filter('ingredient_' + str(i), '=', ingredient)
            result = query.fetch()
            for res in result:
                drinks[res['name']] = []
                # first 15 are all ingredients
                for j in range(1, 16):
                    if res['ingredient_' + str(j)] is None or res['ingredient_' + str(j)] == ' ':
                        drinks[res['name']].append('')
                    else:
                        drinks[res['name']].append(res['ingredient_' + str(j)])
                # second 15 are the measurements
                for j in range(1, 16):
                    if res['measurement_' + str(j)] is None or res['measurement_' + str(j)] == ' ':
                        drinks[res['name']].append('')
                    else:
                        drinks[res['name']].append(res['measurement_' + str(j)])
                # finally the instructions
                drinks[res['name']].append(res['instructions'])

            query = client.query(kind = 'Recipe')

    return drinks


def exact_drinks(ingredients, drinks):

    elgible = {}
    
    # Get the exact drinks that we can make
    for k,v in drinks.items():
        complete = True
        for item in v[0:14]:
            if item in ingredients or item == '':
                continue
            else:
                complete = False
                break
        if complete:
            elgible[k] = v
            

    return elgible

def n_drinks(ingredients, drinks, n):
    
    n_eligible = {}
    
    for k,v in drinks.items():
        matched = 0
        for item in v[0:15]:
            if item in ingredients or item == '':
                matched += 1
        if 15 - n == matched:
            n_eligible[k] = v

    return n_eligible

def setRatings(drink_name,new_rating):

# Instantiates a client
datastore_client = datastore.Client('the-mixologist')

# The kind for the new entity
query = datastore_client.query(kind='Recipe')

query.add_filter('name', '=', drink_name)
result = query.fetch()


for res in result:

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

def getRatings(drink_name):

    # Instantiates a client
    datastore_client = datastore.Client('the-mixologist')

    # The kind for the new entity
    query = datastore_client.query(kind='Recipe')

    query.add_filter('name', '=', drink_name)
    result = query.fetch()

    for res in result:

        avg_rating = int(res['rating'])/int(res['count'])

    return avg_rating

# ingredients = ['Light rum', 'Ginger beer', 'Lemon peel']
# ingredients = [x.lower() for x in ingredients]
# print(ingredients)
# drinks = elgible_drinks(ingredients, query)

# print('exact: ' + str(exact_drinks(ingredients, drinks)))
# print('n: ' + str(n_drinks(ingredients, drinks, 1)))

#route returns exact drinks
@app.route('/exact',methods = ["POST"])
def exact_endpoint():
    client = create_client('the-mixologist')
    query = client.query(kind='Recipe')
    ingredients = request.get_json(force=True)['ingredients']
    ingredients = [x.lower() for x in ingredients]
    print(ingredients)
    drinks = elgible_drinks(ingredients, query)
    exact = exact_drinks(ingredients, drinks)
    return jsonify(exact)

# route returns n drinks away
@app.route('/n_away',methods = ["POST"])
def n_endpoint():
    client = create_client('the-mixologist')
    query = client.query(kind='Recipe')
    ingredients = request.get_json(force=True)['ingredients']
    ingredients = [x.lower() for x in ingredients]
    print(ingredients)
    drinks = elgible_drinks(ingredients, query)
    n = n_drinks(ingredients, drinks)
    return jsonify(n)

# route returns all searches
@app.route('/search',methods = ["POST"])
def n_endpoint():
    client = create_client('the-mixologist')
    query = client.query(kind='Recipe')
    ingredients = request.get_json(force=True)['ingredients']
    ingredients = [x.lower() for x in ingredients]
    print(ingredients)
    drinks = elgible_drinks(ingredients, query)
    return jsonify(drinks)

# return the average ratings
@app.route('/get_ratings',methods = ["Post"])
def n_endpoint():
    name = request.get_json(force=True)['name'][0]
    rating = getRatings(name)
    return jsonify(rating)

# set ratings
@app.route('/set_ratings',methods = ["Post"])
def n_endpoint():
    drink = request.get_json(force=True)['ratings']
    #drink[0]= drink name
    #drink[1]= drink rating
    rating = setRatings(drink[0], drink[1])

if __name__ == '__main__':
    app.run()