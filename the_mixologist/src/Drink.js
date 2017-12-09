import React, { Component } from 'react';
import { ListGroupItem, Badge } from 'reactstrap';

class Drink extends Component {

    constructor(props){
        super(props);
        this.expandInfo = this.expandInfo.bind(this);
    }

    //This function calls from the parent component
    expandInfo(){
        var fn = this.props.onClick;
        fn(this.props.name);
    }

    
    render() {
        //Display the current drink with a badge that determines how many missing ingredients you have
        //On Click the function expandInfo will get called upon calling the parent component function
        return(
            <div>
                <ListGroupItem tag="a" onClick={this.expandInfo} >{this.props.name}<Badge className="App-right" pill>{this.props.recipes[this.props.name][33]}</Badge></ListGroupItem>
            </div>
        )
    }
}


export default Drink;
