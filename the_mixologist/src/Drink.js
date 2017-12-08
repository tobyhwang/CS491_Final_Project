import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';

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
                <ListGroupItem tag="a" onClick={this.expandInfo}>{this.props.name}</ListGroupItem>
            </div>
        )
    }
}


export default Drink;
