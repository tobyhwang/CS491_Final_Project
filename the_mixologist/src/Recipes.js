import React, { Component } from 'react';
import Drink from './Drink'
import './App.css';
// var drinks = "";
class Recipes extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: "",
            json: null,
            recipes: []
        };
    }
    loadRecipe(){
        this.state.recipes = [];
        // if(this.state.recipes !== [])
        //     this.setState({
        //         recipes: []
        //     })

        var recipes = this.props.recipeJSON;
        for(var drink in recipes)
        {
            // if(drink)
            // {
            //     this.setState({
            //         name: drink
            //     })
            // }
            this.state.name = drink;
            var item_1 = recipes[drink][0];
            var item_2 = recipes[drink][1];
            var item_3 = recipes[drink][2];
            var item_4 = recipes[drink][3];
            var item_5 = recipes[drink][4];
            var item_6 = recipes[drink][5];
            var item_7 = recipes[drink][6];
            var item_8 = recipes[drink][7];
            var item_9 = recipes[drink][8];
            var item_10 = recipes[drink][9];
            var item_11 = recipes[drink][10];
            var item_12 = recipes[drink][11];
            var item_13 = recipes[drink][12];
            var item_14 = recipes[drink][13];
            var item_15 = recipes[drink][14];
            var amount_2 = recipes[drink][15];
            var amount_1 = recipes[drink][16];
            var amount_3 = recipes[drink][17];
            var amount_4 = recipes[drink][18];
            var amount_5 = recipes[drink][19];
            var amount_6 = recipes[drink][20];
            var amount_7 = recipes[drink][21];
            var amount_8 = recipes[drink][22];
            var amount_9 = recipes[drink][23];
            var amount_10 = recipes[drink][24];
            var amount_11 = recipes[drink][25];
            var amount_12 = recipes[drink][26];
            var amount_13 = recipes[drink][27];
            var amount_14 = recipes[drink][28];
            var amount_15 = recipes[drink][29];
            var instruction = recipes[drink][30];
            // console.log(instruction);
            var drinkInfo = <Drink name = {drink} item_1 = {item_1} item_2 = {item_2} item_3 = {item_3} item_4 = {item_4} item_5 = {item_5} item_6 = {item_6} item_7 = {item_7} item_8 = {item_8} item_9 = {item_9} item_10 = {item_10} item_11 = {item_11} item_12 = {item_12} item_13 = {item_13} item_14 = {item_14} item_15 = {item_15} amount_1 = {amount_1} amount_2 = {amount_2} amount_3 = {amount_3} amount_4 = {amount_4} amount_5 = {amount_5} amount_6 = {amount_6} amount_7 = {amount_7} amount_8 = {amount_8} amount_9 = {amount_9} amount_10 = {amount_10} amount_11 = {amount_11} amount_12 = {amount_12} amount_13 = {amount_13} amount_14 = {amount_14} amount_15 = {amount_15} instruction = {instruction}/>;
            this.state.recipes = [...this.state.recipes, drinkInfo]
            // console.log("asss + " + drink.valueOf());
            // for(var i = 0; i < MAX_ITEM; i++)
            // {
            //     // console.log(i +  + " " + recipes[drink][i])
            // }
        }
        // this.state.json = recipes;
        // console.log(this.state.json)
        // console.log("item = " + drinkInfo);
    }



    render() {
        return (
            
            <div>
                {this.loadRecipe()}
                {this.state.recipes}
            </div>
        );
    }
}


export default Recipes;
