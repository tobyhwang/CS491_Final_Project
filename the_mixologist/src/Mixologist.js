import React, { Component } from 'react';
import $ from 'jquery';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';
import Drink from './Drink'
import Rating from 'react-star-ratings'
import {Loader} from 'semantic-ui-react'

  
class Mixologist extends Component {
    //Initialize the states and function of this component
    constructor(props){
        super(props);
        this.state ={
            items:[],
            message: '',
            recipeJSON: null,
            homeVisibility: true,
            recipesVisibility: false,
            individualVisibility: false,
            n: 0,
            loading: false,
            activeTab: "home",
            currentRecipe : [],
            currentRecipeName : "",
            currentAvg: 0,
            navtab : null,
            rating: 0,
            ratedDictionary : [],
            ratingMessage: '',
            messageState: false,
            shoppingList: []
        };
        this.recipesLoader = this.recipesLoader.bind(this);
        this.increment_n = this.increment_n.bind(this);
        this.decrement_n = this.decrement_n.bind(this);
        this.findRecipe = this.findRecipe.bind(this);
        this.homepage = this.homepage.bind(this);
        this.listofrecipes = this.listofrecipes.bind(this);
        this.expandRecipe = this.expandRecipe.bind(this);
        this.onStart = this.onStart.bind(this);
        this.loadNav = this.loadNav.bind(this);
        this.changeRating = this.changeRating.bind(this);
        this.displayRating = this.displayRating.bind(this);
        this.shoppingList = this.shoppingList.bind(this);
    }

    //Allows user to add an item to the list of ingredient
    addItem(e){
      e.preventDefault();
      const {items} = this.state;
      const newItem = this.newItem.value;
      const existsOnList = items.includes(newItem);

      //Check for duplicated ingredients
      if(existsOnList){
          this.setState({
            message: 'Ingredient already entered'
      });

      } else {
          //prevent empty submission
          newItem !== '' && this.setState({
              //previously stored items in the state, then add new item
              items: [...this.state.items, newItem],
              message: ''
          });
      }
      this.addForm.reset();
    }

    //Find all the recipes with the given list of ingredients
    findRecipe(){
        //Make sure the list of ingredients is not empty, should not get to this point
        if (this.state.items.length === 0)
        {
            this.setState({
                message: "No ingredients have been given."
            })
            return;
        }

        var itemList = this.state.items.toString();
        var n = this.state.n;
        var itemString = itemList.replace(/,/g, "\",\"");
        var querystring = '{"ingredients":["'  + itemString + '"], "n":' + n +'}';
        
        //Perform ajax call to python server to request a JSON of recipes
        $.ajax({
            url: "http://localhost:5000/naway",
            type: "POST",
            data: querystring,
            dataType: "json",
            success: function(response) {
                return response;
            },
            error: function(response) {
                console.log("Connection Problem", response);
            },

            complete: function(response) {
                console.log("Connection Established", response);
            }
        }).then(res => {
            //Turn loading screen off
            this.setState({
                loading: false
            })

            //Found some recipes, load out the recipes page
            if (Object.keys(res).length !== 0){

                //Load the list of recipes and switch tabs
                this.setState({
                    recipeJSON : res,
                    homeVisibility : false,
                    recipesVisibility : true,
                    individualVisibility : false,
                    activeTab: "recipes",
                })
            }
            //Otherwise, we did not find any recipes with the given list of ingredients
            else{
                this.setState({
                    message: "Could not find any recipes with the list of ingredients. Please try again."
                })
            }
        })
        //Turn on loading page
        this.setState({
            loading: true
        })
    }

    //Remove an item from the list of ingredients
    removeItem(item){
        const newItems = this.state.items.filter(newItem =>{
           return  newItem !== item;
        });

        this.setState({
           items: [...newItems]
        });

        if(newItems.length === 0) {
            this.setState({
                message: 'No items are currently added'
            });
        }
    }
    
    //Button handler for incrementing the counter for the difference of ingredients
    increment_n(){
        var n = this.state.n;
        if (n < 15){
            this.setState({
                n: (n + 1)
            })
        }
        else{
            this.setState({
                message: 'Maximum difference value of 15'
            })
        }
    }

    //Button handler for decrementing the counter for the difference of ingredients
    decrement_n(){
        var n = this.state.n;
        if (n > 0){
            this.setState({
                n: (n - 1)
            })
        }
        else{
            this.setState({
                message: 'Minimum difference value of 0'
            })
        }
    }

    //Navbar tab handler, loads the recent drink that the user have looked up
    loadNav(){
        this.setState({
            individualVisibility : true,
            shoppingList: [],
            recipesVisibility : false,
            homeVisibility : false,
            activeTab: "current"
        })
    }

    //Submit a rating to the python server
    changeRating( newRating ) {
        var querystring = '{"name": "'  + this.state.currentRecipeName + '", "ratings":"' + newRating +'"}';
        var dictionary = this.state.ratedDictionary;
        if(dictionary[this.state.currentRecipeName]){
            //This user already rated this drink
            this.setState({
                rating: dictionary[this.state.currentRecipeName],
                ratingMessage : "You've already rated this drink.",
                messageState: false,
                shoppingList: []
            })
        }
        else{
            //Set new rating
            dictionary[this.state.currentRecipeName] = newRating;
            
            //Make an ajax call to change the current average rating of the drink
            $.ajax({
                url: "http://localhost:5000/setratings",
                type: "POST",
                data: querystring,
                dataType: "json",
                success: function(response) {
                    return response;
                },
                error: function(response) {
                    console.log("Connection Problem", response);
                },

                complete: function(response) {
                    console.log("Connection Established", response);
                }
            }).then((req)=>{
                var avg = req['rating']/req['count'];
                avg = avg.toFixed(2);
                $('#avg').text(avg)
                $('#currentRating').attr('rating', newRating)
                this.setState({
                    rating: newRating,
                    currentAvg: avg,
                    ratedDictionary: dictionary,
                    ratingMessage: "You've rated this drink.",
                    messageState: true,
                    shoppingList: []
                });
            })
        }
    }

    //Button handler for displaying the recipe
    expandRecipe(name){
        var recipes = this.state.recipeJSON;
        //Make sure we have a list of recipes to look through, otherwise don't perform any task
        if(this.state.recipesVisibility && Object.keys(recipes).length !== 0){
            var avg = 0;

            //Retrieve the average rating on this drink
            if (recipes[name][32] === 0 && recipes[name][31]===0){
                avg = 0
            }
            else{
                avg = recipes[name][32]/recipes[name][31];
                avg = avg.toFixed(2);
            }
            
            //HTML to be loading in the drink's recipe tab
            var html = [(recipes[name][0] !== '') && (<div key="1">{recipes[name][15]} {recipes[name][0]}</div>),
            (recipes[name][1] !== '') && <div key="2">{recipes[name][16]} {recipes[name][1]}</div>,
            (recipes[name][2] !== '') && <div key="3">{recipes[name][17]} {recipes[name][2]}</div>,
            (recipes[name][3] !== '') && <div key="4">{recipes[name][18]} {recipes[name][3]}</div>,
            (recipes[name][4] !== '') && <div key="5">{recipes[name][19]} {recipes[name][4]}</div>,
            (recipes[name][5] !== '') && <div key="6">{recipes[name][20]} {recipes[name][5]}</div>,
            (recipes[name][6] !== '') && <div key="7">{recipes[name][21]} {recipes[name][6]}</div>,
            (recipes[name][7] !== '') && <div key="8">{recipes[name][22]} {recipes[name][7]}</div>,
            (recipes[name][8] !== '') && <div key="9">{recipes[name][23]} {recipes[name][8]}</div>,
            (recipes[name][9] !== '') && <div key="10">{recipes[name][24]} {recipes[name][9]}</div>,
            (recipes[name][10] !== '') && <div key="11">{recipes[name][25]} {recipes[name][10]}</div>,
            (recipes[name][11] !== '') && <div key="12">{recipes[name][26]} {recipes[name][11]}</div>,
            (recipes[name][12] !== '') && <div key="13">{recipes[name][27]} {recipes[name][12]}</div>,
            (recipes[name][13] !== '') && <div key="14">{recipes[name][28]} {recipes[name][13]}</div>,
            (recipes[name][14] !== '') && <div key="15">{recipes[name][29]} {recipes[name][14]}</div>,
            (recipes[name][30] !== '') && <div key="16">Instruction: {recipes[name][30]}</div>]
            
            //See if this user is allow to rate this drink
            if(this.state.ratedDictionary[name] >= 0){
                //This user already rated this drink
                this.setState({
                    rating : this.state.ratedDictionary[name],
                    ratingMessage: "You've already rated this drink",
                    messageState: false
                })
            }
            //Otherwise the user has not rated this drink
            else{
                this.setState({
                    rating : 0,
                    messageState: true,
                    ratingMessage: "Please rate this drink!!!"
                })
            }
            //Load out the drink's recipe tab
            this.setState({
                currentRecipe : html,
                individualVisibility : true,
                recipesVisibility : false,
                homeVisibility : false,
                activeTab : "current",
                currentRecipeName : name,
                currentAvg : avg,
                rating : this.state.ratedDictionary[name],
                shoppingList : [],
                navtab : <NavItem><NavLink className={ this.state.activeTab === "current" ? "active" : "link"} onClick={this.loadNav}>{name}</NavLink></NavItem>
            })
        }
    }

    //Display the rating component with the current drink's recipe being displayed
    displayRating(){
        var message = this.state.ratingMessage;

        //See if the drink's recipe tab should be active
        if(this.state.individualVisibility){
            //If so, return the rating component
            return(
                <div>
                    <div> Average rating for this recipe is <b>{this.state.currentAvg}/5.00</b></div>
                    <Rating id="currentRating"
                        rating={this.state.rating}
                        isSelectable={true}
                        isAggregateRating={true}
                        changeRating={this.changeRating}
                        starSelectingHoverColor='rgb(255, 255, 0)'
                        starRatedColor='rgb(255, 255, 0)'
                        numOfStars={ 5 }/>
                        {(message !== '' ) && <p className={this.state.messageState ? "message text-success" : "message text-danger"}>{message}</p>}
                </div>
            )
        }
    }

    //Load the list of recipes tab when active
    recipesLoader(){
        var recipes = this.state.recipeJSON;
        var html = [];
        var i = 0;
        if(recipes)
        {
            if(this.state.recipesVisibility && Object.keys(recipes).length !== 0){
                for(var drink in recipes)
                {
                    html = [...html, <Drink key = {i} name = {drink} recipes = {this.state.recipeJSON} onClick = {this.expandRecipe} />]
                    i++;
                }
                return html;
            }
        }
    }

    //Clear all the ingredients given from the user
    clearAll(){

        this.setState({
            items: [],
            message: 'No items are currently added'
        });
    }

    //Load our main homepage html
    loadHTML(){
        const{items, message} = this.state;
        if(this.state.homeVisibility){
            return (
            <div>
                <header>
                    <h1>Ingredient List</h1>
                </header>
        
                <form ref={input => this.addForm = input} className="form-inline" onSubmit={(e) => {this.addItem(e)}}>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="newItemInput">Add New Item</label>
                        <input ref={input => this.newItem = input} placeholder="ex. vodka" className="form-control" id="newItemInput"/>
                        <Button type="submit" className="btn btn-primary">+</Button>
                    </div>
        
                </form>
        
                <div className="App">
                    {(message !== '' || items.length === 0) && <p className="message text-danger">{message}</p>}
                    {
                        items.length > 0 &&
                        <table className = "table">
                            <tbody>
                                <tr>
                                    <th>#</th>
                                    <th>Item</th>
                                </tr>
                            {
                                items.map(item => {
                                    return(
                                        <tr key = {item}>
                                            <th scope = "row">{items.indexOf(item) + 1}</th>
                                            <td>{item}</td>
                                            <td className="text-right" colSpan="1">
                                                <Button onClick={(e)=> this.removeItem(item)} className="btn btn-default btn-sm">
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                            <tfoot>
                                <th>Load recipes with <Button onClick={this.decrement_n}>-</Button>  {this.state.n}  <Button onClick={this.increment_n}>+</Button> ingredients away</th>
                                <td></td>
                                <td className="text-right">
                                        <Button onClick={(e) => this.clearAll()} className="btn btn-default btn-sm">Clear List</Button>
                                </td>
                            </tfoot>
                        </table>
                    }
                </div>
                <Button onClick={this.findRecipe} className="btn btn-default btn-sm">Search</Button>
            </div>
            )
        }
        //Hide the home page
        else{
            return (<div></div>)
        }
    }

    //Loading screen when activated by flag
    loadingScreen(){
        if(this.state.loading){
            return(
                <Loader active/>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    //Load the home page
    homepage(){
        if(this.state.activeTab === "home"){
            //Already on the homepage, don't do anything
        }
        else{
            this.setState({
                homeVisibility: true,
                recipesVisibility: false,
                individualVisibility: false,
                activeTab: "home",
                message: ""
            })
        }
    }

    //Load the list of recipes
    listofrecipes(){
        if(!this.state.recipeJSON)
        {
            this.setState({
                message : "No recipes have been loaded yet. Please search for recipes."
            })
            return; 
        }
        if(Object.keys(this.state.recipeJSON).length === 0){
            //Already on the homepage, don't do anything
            this.setState({
                message : "No recipes have been loaded yet. Please search for recipes."
            })
            return; 
        }
        
        if(this.state.activeTab === "recipes"){
            //Already on the homepage, don't do anything
        }
        else{
            this.setState({
                homeVisibility: false,
                recipesVisibility: true,
                individualVisibility: false,
                activeTab: "recipes"
            })
        }
    }

    //Load the current recipe
    loadIndividual(){
        if(this.state.individualVisibility)
        {
            return this.state.currentRecipe
        }
    }

    //Helper function to load a dynamic navbar
    onStart(){
        return (
            <Nav tabs>
                <NavItem>
                    <NavLink id="home" className={ this.state.activeTab === "home" ? "active" : "link"} onClick={this.homepage}>The Mixologist</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink id="recipes" className={ this.state.activeTab === "recipes" ? "active" : "link"} onClick={this.listofrecipes}>Recent Search</NavLink>
                </NavItem>
                {this.state.navtab}
            </Nav>
        )
    }

    //Create a shopping list of missing ingredients
    shoppingList(){
        if(this.state.individualVisibility)
        {
            if(this.state.recipeJSON && (this.state.currentRecipeName !== '') && (this.state.items !== []))
            {
                var recipeJson = this.state.recipeJSON;
                var drink = this.state.currentRecipeName;
                var itemList = this.state.items;
                var length = itemList.length;
                
                for(var i = 0; i < 15; i++)
                {
                    var currItem = recipeJson[drink][i];
                    if(currItem !== '')
                    {
                        var inList = false;

                        for(var j = 0; j < length; j++)
                        {
                            if(itemList[j] === currItem)
                            {
                                inList = true; 
                            }
                        }
                        if(!inList)
                        {
                            this.state.shoppingList = [...this.state.shoppingList, <div>-{currItem}</div>]
                        }
                    }
                }
                return(
                    <div className="text-danger">
                        <b>
                            {(this.state.shoppingList.length !== 0) ? <div className="text-danger">Additional ingredients required!!!</div> : <div className="text-success">You have ALL the ingredients!!! Make it and rate it!!!</div>}
                            {this.state.shoppingList}
                        </b>
                    </div>
                ) 

            }
        }
    }


    render() {
        return(
            <div>
                <div>{this.onStart()}</div>
                <div>{this.loadHTML()}</div>
                <div>{this.recipesLoader()}</div>
                <div>{this.loadingScreen()}</div>
                <div>{this.loadIndividual()}</div>
                <div>{this.displayRating()}</div>
                <div>{this.shoppingList()}</div>
            </div>
        )
    }
}

export default Mixologist;
