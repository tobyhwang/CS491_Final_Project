import json
import requests
import time

def filterRequests():
    pass

# get all the ingredients back
ingredient_request = requests.get('http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')

ingredients = ingredient_request.json()

possible_ingredients = []

# get each ingredient from the json file
for item in ingredients['drinks']:
    possible_ingredients.append(item['strIngredient1'])

possible_drinks = []
# get all the possible drink combinations

with open('drinks.txt', 'w') as out:
    for ingredient in possible_ingredients:
        drinks = requests.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient)
        json.dump(drinks.json()['drinks'], out)
        drinks = drinks.json()['drinks']
        for d in drinks:
            possible_drinks.append((d['idDrink'], d['strDrink']))


# write
with open('recipes.txt', 'w') as outfile:
    for drink in possible_drinks:
        recipe_request = requests.get('http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drink[0])
        json.dump(recipe_request.json()['drinks'], outfile)
        print(drink)
        time.sleep(.5)

# # read
# with open('recipes.txt') as json_data:
#     d = json.load(json_data)
#     print(d[0]['idDrink'])
