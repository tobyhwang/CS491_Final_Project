import React, { Component } from 'react';
import Drink from './Drink'

var MAX_ITEM = 31;
var item = "";
class Recipes extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: "",
            json: null
        };
    }
    loadRecipe(){
        var recipes = this.props.recipeJSON;
        console.log("Recipe = " + JSON.stringify(recipes))
        console.log(recipes);
        for(var drink in recipes)
        {
            // if(drink)
            // {
            //     this.setState({
            //         name: drink
            //     })
            // }
            this.state.name = drink;
            item = <Drink name = {drink}/>;
            item = item + item;
            // console.log("asss + " + drink.valueOf());
            // for(var i = 0; i < MAX_ITEM; i++)
            // {
            //     // console.log(i +  + " " + recipes[drink][i])
            // }
        }
        // this.state.json = recipes;
        // console.log(this.state.json)
        console.log("item = " + item);
    }



    render() {
        return (
            <div onClick={this.loadRecipe()}>
                {item}
            </div>
        );
    }
}


export default Recipes;
