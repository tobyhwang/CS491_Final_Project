import React, { Component } from 'react';
import $ from 'jquery';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Drink extends Component {

    constructor(props){
        super(props);
        this.state ={
            name: this.props.name,
            item_1: this.props.item_1,
            json: this.props.json,
            visibility: false

        };
        this.constructHTML = this.constructHTML.bind(this);
        this.expandInfo = this.expandInfo.bind(this);
        this.displayDrink = this.displayDrink.bind(this);
    }

    constructHTML(){
        return (
                <div>
                    <div>{this.props.item_1} : {this.props.amount_1}</div>
                    <div>{this.props.item_2} : {this.props.amount_2}</div>
                    <div>{this.props.item_3} : {this.props.amount_3}</div>
                    <div>{this.props.item_4} : {this.props.amount_4}</div>
                    <div>{this.props.item_5} : {this.props.amount_5}</div>
                    <div>{this.props.item_6} : {this.props.amount_6}</div>
                    <div>{this.props.item_7} : {this.props.amount_7}</div>
                    <div>{this.props.item_8} : {this.props.amount_8}</div>
                    <div>{this.props.item_9} : {this.props.amount_9}</div>
                    <div>{this.props.item_10} : {this.props.amount_10}</div>
                    <div>{this.props.item_11} : {this.props.amount_11}</div>
                    <div>{this.props.item_12} : {this.props.amount_12}</div>
                    <div>{this.props.item_13} : {this.props.amount_13}</div>
                    <div>{this.props.item_14} : {this.props.amount_14}</div>
                    <div>{this.props.item_15} : {this.props.amount_15}</div>
                    <div>{this.props.instruction}</div>
                </div>
        )
    }

    expandInfo(){
       if(this.state.visibility){
           this.setState({
               visibility:false
           })
       }
       else{
            this.setState({
                visibility:true
            }) 
       }
    }

    displayDrink(){
        if(this.state.visibility){
            return (
                <div id={this.props.name}>
                    <div>{this.props.item_1} : {this.props.amount_1}</div>
                    <div>{this.props.item_2} : {this.props.amount_2}</div>
                    <div>{this.props.item_3} : {this.props.amount_3}</div>
                    <div>{this.props.item_4} : {this.props.amount_4}</div>
                    <div>{this.props.item_5} : {this.props.amount_5}</div>
                    <div>{this.props.item_6} : {this.props.amount_6}</div>
                    <div>{this.props.item_7} : {this.props.amount_7}</div>
                    <div>{this.props.item_8} : {this.props.amount_8}</div>
                    <div>{this.props.item_9} : {this.props.amount_9}</div>
                    <div>{this.props.item_10} : {this.props.amount_10}</div>
                    <div>{this.props.item_11} : {this.props.amount_11}</div>
                    <div>{this.props.item_12} : {this.props.amount_12}</div>
                    <div>{this.props.item_13} : {this.props.amount_13}</div>
                    <div>{this.props.item_14} : {this.props.amount_14}</div>
                    <div>{this.props.item_15} : {this.props.amount_15}</div>
                    <div>{this.props.instruction}</div>
                </div>
            )
        }
        else{
            return <div></div>
        }
    }


    render() {
        return(
            <div>
                {/* <button onClick={this.expandInfo}>{this.props.name}</button> */}
                
                <ListGroupItem tag="a" onClick={this.expandInfo}>{this.props.name}</ListGroupItem>
                {this.displayDrink()}
            </div>
        )
    }
}


export default Drink;
