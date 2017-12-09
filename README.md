# CS491 Final Project - The Mixologist

This project focuses on creating a web application using an ensemble of web technologies.  The premise of the web application allows a user to enter in a list of ingredients and return back a list of elgible drinks.  The user can also enter in a specific amount of ingredients "away" from completing a drink and the lists will be compiled with all possible drinks with n or less ingredients missing.  Each drink can be rated out of 5 stars and can not be rated more than once per browsing session.

### Notes to the Grader

As discussed with Professor Kanich, we will not be handling reviews as previously stated in the proposal due to the fact that we are not creating any type of login profiles.  Instead we will allow the user to rate each drink only once per browsing session.  So a user can't review a drink more than once in a session.  Loading time for drinks will take a little bit of time, but if there is noticable lag (or anything else related), just refresh the url.

### Prerequisites & Installing

1) Make sure that you have at least Python 3.6 installed on your computer and install Flask

```
sudo pip3 install Flask
```

2) Make sure that you have the latest version of npm

```
brew install node
brew upgrade node
```

3) You will need to be authorized to our Google Cloud Datastore where the information is stored.  The key is stored in the main directory named as The_Mixologist_key.json.  Follow the link https://cloud.google.com/sdk/docs/how-to to get your Google Cloud account set up locally on your computer.

## Running the Application

1) Start the flask server by navigating to Server.py in the src directory of the-mixologist.

```
export FLASK_APP=Server.py
flask run
```

2) Run the React Application by navigating to the-mixologist directory.

```
npm install
npm start
```


## Walkthough

1) Enter a number of drinks into the search bar
2) Add/Remove items from the list
3) Increment/Decement the number of drinks
4) Click "Find Recipe" to go to the next tab of drinks
5) Each drink will have a numbered badge corresponding to the number of missing ingredients
6) Click on a drink and the recipe will be displayed with the instructions
7) Rate the beverage (can only rate once)
8) If there are missing ingredients, they will be displayed to you
9) Average rating of beverage will also be displayed to the user

## Sample Cases
1) Light rum, ginger beer, light rum  n=0
2) Gin, lime  n=2
3) Tequila  n=2
4) Armaretto, coke  n=3
5) Vodka, rum  n=2

## Built With

* [React](https://reactjs.org/) - Web Framework
* [Cloud Datastore](https://cloud.google.com/datastore/) - Database System
* [Flask](http://flask.pocoo.org/) - Backend Server
* [The CocktailDB](http://www.thecocktaildb.com/api.php) - Cocktail/Drink Data

## Authors

* **Tobin Hwang (hwang62@uic.edu)** - *Initial Setup and Python Scrips, Python Backend Server, Datastore*
* **Paul Nguyen (pngye40@uic.edu)** - *Handled Front End Development, Edited Python Backend Sever*


