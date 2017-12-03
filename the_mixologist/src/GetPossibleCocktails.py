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
        if 15 - n <= matched:
            n_eligible[k] = v

    return n_eligible

client = create_client('the-mixologist')
query = client.query(kind='Recipe')

#ingredients = ['Light rum', 'Ginger beer']
#drinks = elgible_drinks(ingredients, query)

#print('exact: ' + str(exact_drinks(ingredients, drinks)))
#print('n: ' + str(n_drinks(ingredients, drinks, 1)))

@app.route('/eligible',methods = ["POST"])
def eligible_endpoint():
    ingredients = request.get_json(force=True)['ingredients']
    print(ingredients)
    drinks = elgible_drinks(ingredients, query)
    elgible = exact_drinks(ingredients, drinks)
    return jsonify(elgible)

@app.route('/eligible2',methods = ["POST"])
def eligible2_endpoint():
    ingredients = request.get_json(force=True)['ingredients']
    print(ingredients)
    drinks = elgible_drinks(ingredients, query)
    elgible = exact_drinks(ingredients, drinks)
    return jsonify(elgible)

if __name__ == '__main__':
    app.run()