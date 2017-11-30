import json
import re

# read in the entire csv
groupDrinks = []

fo = open("recipes.txt", "r")

for line in fo.readlines():
    groupDrinks.append(json.loads(line.strip())['drinks'])



# get the drink id
for drink in groupDrinks:
    name = drink[0]['strDrink']
    id = drink[0]['idDrink']
    instructions = drink[0]['strInstructions']
    ingredient_1 = (drink[0]['strIngredient1'], drink[0]['strMeasure1'])
    ingredient_2 = (drink[0]['strIngredient2'], drink[0]['strMeasure2'])
    ingredient_3 = (drink[0]['strIngredient3'], drink[0]['strMeasure3'])
    ingredient_4 = (drink[0]['strIngredient4'], drink[0]['strMeasure4'])
    ingredient_5 = (drink[0]['strIngredient5'], drink[0]['strMeasure5'])
    ingredient_6 = (drink[0]['strIngredient6'], drink[0]['strMeasure6'])
    ingredient_7 = (drink[0]['strIngredient7'], drink[0]['strMeasure7'])
    ingredient_8 = (drink[0]['strIngredient8'], drink[0]['strMeasure8'])
    ingredient_9 = (drink[0]['strIngredient9'], drink[0]['strMeasure9'])
    ingredient_10 = (drink[0]['strIngredient10'], drink[0]['strMeasure10'])
    ingredient_11 = (drink[0]['strIngredient11'], drink[0]['strMeasure11'])
    ingredient_12 = (drink[0]['strIngredient12'], drink[0]['strMeasure12'])
    ingredient_13 = (drink[0]['strIngredient13'], drink[0]['strMeasure13'])
    ingredient_14 = (drink[0]['strIngredient14'], drink[0]['strMeasure14'])
    ingredient_15 = (drink[0]['strIngredient15'], drink[0]['strMeasure15'])


print(ingredient_1)
print(groupDrinks[len(groupDrinks)-1][0])

   