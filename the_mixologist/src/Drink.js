import React, { Component } from 'react';
import $ from 'jquery';

class Drink extends Component {

    constructor(props){
        super(props);
        this.state ={
            name: this.props.name,
            item_1: this.props.item_1,
            json: this.props.json,
        };
        this.constructHTML = this.constructHTML.bind(this);
        this.expandInfo = this.expandInfo.bind(this);
    }

    constructHTML(){
        return (
            '<div>' + this.props.name +'</div>'
        );
    }
        

    expandInfo(){
        var html = this.constructHTML();
        $('#info').html(html);
    }


    render() {
        return(
            <div>
                <button onClick={this.expandInfo}>{this.props.name}</button>
                <div id="info"></div>
            </div>
        )
    }
}


export default Drink;
