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
                <ListGroupItem tag="a" onClick={this.expandInfo} ><div className = "text-left"><div>{this.props.name}</div><Badge pill>{this.props.recipes[this.props.name][33]} missing ingredients</Badge></div></ListGroupItem>
            </div>
        )
    }
}


export default Drink;
