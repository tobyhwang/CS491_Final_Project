import React, { Component } from 'react';
import $ from 'jquery';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Drink from './Drink'
import Rating from 'react-star-ratings'

  
class Items extends Component {

    constructor(props){
        super(props);
        this.state ={
            items:["lemon peel", "ginger beer", "light rum"],
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

    recipes(){
        console.log("hi");
    }

    addItem(e){
      e.preventDefault();
      const {items} = this.state;
      const newItem = this.newItem.value;

      const existsOnList = items.includes(newItem);

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


    findRecipe(){
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
        // console.log("QUERY = " + querystring);
        
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
            this.setState({
                loading: false
            })

            //Found some recipes, load out the recipes page
            if (Object.keys(res).length !== 0){
                console.log(res)
                $( "#recipes" ).attr("active", "true");
                $( "#home" ).attr("active", "false");
                this.setState({
                    recipeJSON : res,
                    homeVisibility : false,
                    recipesVisibility : true,
                    individualVisibility : false,
                    activeTab: "recipes",
                })
                $('#home').text("New Search")
            }
            else{
                this.setState({
                    message: "Could not find any recipes with the list of ingredients. Please try again."
                })
            }
        })
        this.setState({
            loading: true
        })
    }

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

    loadNav(){
        this.setState({
            individualVisibility : true,
            shoppingList: [],
            recipesVisibility : false,
            homeVisibility : false,
            activeTab: "current"
        })
    }

    changeRating( newRating ) {
        var querystring = '{"name": "'  + this.state.currentRecipeName + '", "ratings":"' + newRating +'"}';
        console.log(querystring);
        var dictionary = this.state.ratedDictionary;
        console.log("FUCKEN LOVE ASS = " + dictionary[this.state.currentRecipeName])
        if(dictionary[this.state.currentRecipeName]){
            //This user already rated this drink
            this.setState({
                rating: dictionary[this.state.currentRecipeName],
                ratingMessage : "You've already rated this drink.",
                messageState: false
            })
        }
        else{
            //Set new rating
        
            dictionary[this.state.currentRecipeName] = newRating;
            // this.setState({
            // })
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
                console.log(req)
                console.log(req['count'])
                console.log(req['rating'])
                var avg = req['rating']/req['count'];
                avg = avg.toFixed(2);
                $('#avg').text(avg)
                $('#currentRating').attr('rating', newRating)
                this.setState({
                    rating: newRating,
                    currentAvg: avg,
                    ratedDictionary: dictionary,
                    ratingMessage: "You've rated this drink.",
                    messageState: true
                });
            })
        }
    }


    expandRecipe(name){
        var recipes = this.state.recipeJSON;
        
        if(this.state.recipesVisibility && Object.keys(recipes).length !== 0){
            var avg = 0;
            if (recipes[name][32] === 0 && recipes[name][31]===0){
                avg = 0
            }
            else{
                avg = recipes[name][32]/recipes[name][31];
                avg = avg.toFixed(2);
            }
            
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
            
            if(this.state.ratedDictionary[name] >= 0){
                this.setState({
                    rating : this.state.ratedDictionary[name],
                    ratingMessage: "You've already rated this drink",
                    messageState: false
                })
            }
            else{
                this.setState({
                    rating : 0,
                    messageState: true,
                    ratingMessage: "Please rate this drink!!!"
                })
            }
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
    // {
    //     (message !== '' ) && <p className="message text-danger">{message}</p>
    //     }
    displayRating(){
        var message = this.state.ratingMessage
        if(this.state.individualVisibility){
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
                        
                        {
                        (message !== '' ) && <p className={this.state.messageState ? "message text-success" : "message text-danger"}>{message}</p>
                        }
                </div>
                )
        }
    }

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



    clearAll(){

        this.setState({
            items: [],
            message: 'No items are currently added'
        });
    }
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
                        <button type="submit" className="btn btn-primary">+</button>
                    </div>
        
                </form>
        
                <div className="App">
                    {
                        (message !== '' || items.length === 0) && <p className="message text-danger">{message}</p>
                    }
                    {
                        items.length > 0 &&
                        <table className = "table">
                            {/* <caption>Ingredient List</caption> */}
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
                                                <button onClick={(e)=> this.removeItem(item)} className="btn btn-default btn-sm">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                            <tfoot>
                                <th><button onClick={this.decrement_n}>-</button>{this.state.n}<button onClick={this.increment_n}>+</button></th>
                                <th>
                                        <button onClick={(e) => this.clearAll()} className="btn btn-default btn-sm">Clear List</button>
                                </th>
                            </tfoot>
                        </table>
                    }
                </div>
                <button onClick={this.findRecipe} className="btn btn-default btn-sm">Search</button>
                
            </div>
        
        
            )
        }
        else{
            return (<div></div>)
        }
    }

    loadingScreen(){
        if(this.state.loading){
            return(
                <div>Loading</div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    homepage(){
        if(this.state.activeTab === "home"){
            //Already on the homepage, don't do anything
        }
        else{
            this.setState({
                items: [],
                homeVisibility: true,
                recipesVisibility: false,
                individualVisibility: false,
                activeTab: "home",
                message: "",
                shoppingList: []
            })
            $('#home').text("The Mixologist")
        }
    }

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
                items: [],
                homeVisibility: false,
                recipesVisibility: true,
                individualVisibility: false,
                activeTab: "recipes",
                shoppingList: []
            })
        }
    }

    loadIndividual(){
        if(this.state.individualVisibility)
        {
            return this.state.currentRecipe
        }
    }

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

    shoppingList(){
        if(this.state.individualVisibility)
        {
            if(this.state.recipeJSON && (this.state.currentRecipeName !== '') && (this.state.items !== []))
            {
                var shoppingList = this.state.shoppingList;
                var recipeJson = this.state.recipeJSON;
                var drink = this.state.currentRecipeName;
                var itemList = this.state.items;
                var length = itemList.length;

                console.log(itemList);
                // console.log(recipeJson[drink])
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
                                console.log(currItem + "exist in the list")
                                inList = true; 
                            }
                        }
                        if(!inList)
                        {
                            console.log(currItem + "item does not exist. Adding.....")
                            // shoppingList = [...shoppingList, <div>{currItem}</div>]
                            this.state.shoppingList = [...this.state.shoppingList, <div>{currItem}</div>]
                        }
                    }
                }
                return this.state.shoppingList;

            }
        }
    }

    // <div>{this.shoppingList()}</div>

    render() {
        return(
            <div>
                <div>{this.onStart()}</div>
                <div>{this.loadHTML()}</div>
                <div>{this.recipesLoader()}</div>
                <div>{this.loadingScreen()}</div>
                <div>{this.loadIndividual()}</div>
                <div>{this.displayRating()}</div>
            </div>
        )
    }
}

export default Items;
