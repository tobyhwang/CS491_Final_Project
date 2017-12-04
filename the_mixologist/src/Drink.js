import React, { Component } from 'react';
  
class Drink extends Component {

    constructor(props){
        super(props);
        this.state ={
            name: this.props.name,
            json: this.props.json,
            help: ""
        };
    }
    loadDrink(){
        var recipe = this.state.json;
        // console.log(recipe[this.state.name][0]);
        // this.state.help = recipe[this.state.name][0];
        var json = this.state.json;
        var name = this.state.name;
        if (json)
        {
            console.log("HELLA ASS " + json[name][0]);
        }
        else
        {
            console.log("FAIL");
        }
    }



    render() {
        return(
            <div>
                <button onClick={this.loadDrink()}>{this.props.name}</button>
            </div>
        )
    }
}


export default Drink;
