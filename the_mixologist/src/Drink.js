import React, { Component } from 'react';
import { ListGroupItem, Badge } from 'reactstrap';

class Drink extends Component {

    constructor(props){
        super(props);
        this.expandInfo = this.expandInfo.bind(this);
    }

    expandInfo(){
        var fn = this.props.onClick;
        fn(this.props.name);
    }

    
    render() {
        return(
            <div>
                <ListGroupItem tag="a" onClick={this.expandInfo} >{this.props.name}<Badge className="App-right" pill>{this.props.recipes[this.props.name][33]}</Badge></ListGroupItem>
            </div>
        )
    }
}


export default Drink;
