import React, { Component } from 'react';
  
class Items extends Component {
  constructor(props){
  	super(props);
  	this.inputedItem = "";
  	this.itemList = [];
  }

  addInputToList(){
  	var input = document.getElementById('item_field').value;
  	var list = document.getElementById('item_list');
  	var list_element = document.createElement("li");
  	list_element.appendChild(document.createTextNode(input));
  	list_element.setAttribute("id", "1");
  	list.appendChild(list_element);

  }


  render() {
    return (
      /*Ingredient Module: User can add an ingredient to a list*/
      <div className="App">
      	<input type="text" id="item_field"></input>
      	<input id="add_item" onClick={this.addInputToList} type="submit" value="+"></input>
      	<ul id="item_list"></ul>
      </div>

    );
  }
}


export default Items;
