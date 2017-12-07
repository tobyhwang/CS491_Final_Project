import React, { Component } from 'react';
import $ from 'jquery';
import Recipes from './Recipes';
  
class Items extends Component {

    constructor(props){
        super(props);
        this.state ={
            items:['Light rum', 'Lemon peel', 'Ginger beer'],
            message: '',
            recipeJSON: null,
            visibility: true,
            n: 0,
            loading: false
        };
        // this.findRecipe = this.findRecipe.bind(this);
        this.itemLoader = this.itemLoader.bind(this);
        this.increment_n = this.increment_n.bind(this);
        this.decrement_n = this.decrement_n.bind(this);
        this.findRecipe = this.findRecipe.bind(this);

    }

    addItem(e){
      e.preventDefault();
      const {items} = this.state;
      const newItem = this.newItem.value;

      const existsOnList = items.includes(newItem);

      if(existsOnList){

          this.setState({
            message: 'Ingredient already entered'
      });

      } else {

          //prevent empty submission
          newItem !== '' && this.setState({
              //previously stored items in the state, then add new item
              items: [...this.state.items, newItem],
              message: ''
          });
      }

      this.addForm.reset();
    }


    findRecipe(){
        // console.log(this.state.items);
        var itemList = this.state.items.toString();
        var n = this.state.n;
        var itemString = itemList.replace(/,/g, "\",\"");
        var querystring = '{"ingredients":["'  + itemString + '"], "n":' + n +'}';
        console.log("QUERY = " + querystring);
        
        var json = $.ajax({
            url: "http://localhost:5000/naway",
            type: "POST",
            data: querystring,
            // processData: false,
            // contentType: 'application/json',
            dataType: "json",
            // async: false,
            success: function(response) {
                // return response;
                // this.setState({
                //     recipeJSON : response.responseJSON
                // })
                return response;
            },
            error: function(response) {
                console.log("Connection Problem", response);
            },

            complete: function(response) {
                console.log("Connection Established", response);
            }
        }).then(res => {
            console.log('assss' + res)
            this.setState({
                recipeJSON : res,
                loading: false
            })
            if (this.state.recipeJSON !== []){
                this.setState({
                    visibility : false
                })
            }
        })
        this.setState({
            loading: true
        })

        // this.setState({
        //     recipeJSON : json.responseJSON
        // })

        
    }

    removeItem(item){

        const newItems = this.state.items.filter(newItem =>{
           return  newItem !== item;
        });

        this.setState({

           items: [...newItems]

        });


        if(newItems.length === 0) {
            this.setState({
                message: 'No items are currently added'
            });
        }

    }
    
    increment_n(){
        var n = this.state.n;
        if (n < 15){
            this.setState({
                n: (n + 1)
            })
        }
        else{
            this.setState({
                message: 'Maximum difference value of 15'
            })
        }
    }

    decrement_n(){
        var n = this.state.n;
        if (n > 0){
            this.setState({
                n: (n - 1)
            })
        }
        else{
            this.setState({
                message: 'Minimum difference value of 0'
            })
        }
    }

    itemLoader(){
        // console.log("itemloader");
        return(
            <Recipes recipeJSON={this.state.recipeJSON}/>
        )
    }

    clearAll(){

        this.setState({
            items: [],
            message: 'No items are currently added'
        });
    }
    loadHTML(){
        const{items, message} = this.state;
        if(this.state.visibility){
            return (
            <div>
                <header>
                    <h1>Ingredient List</h1>
                </header>
        
                <form ref={input => this.addForm = input} className="form-inline" onSubmit={(e) => {this.addItem(e)}}>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="newItemInput">Add New Item</label>
                        <input ref={input => this.newItem = input} placeholder="ex. vodka" className="form-control" id="newItemInput"/>
                        <button type="submit" className="btn btn-primary">+</button>
                    </div>
        
                </form>
        
                <div className="App">
                    {
                        (message !== '' || items.length === 0) && <p className="message text-danger">{message}</p>
                    }
                    {
                        items.length > 0 &&
                        <table className = "table">
                            {/* <caption>Ingredient List</caption> */}
                            <thread>
                                <tr>
                                    <th>#</th>
                                    <th>Item</th>
                                    <th>Action</th>
                                </tr>
                            </thread>
                            <tbody>
                            {
                                items.map(item => {
                                    return(
                                        <tr key = {item}>
                                            <th scope = "row">{items.indexOf(item) + 1}</th>
                                            <td>{item}</td>
                                            <td className="text-right" colSpan="1">
                                                <button onClick={(e)=> this.removeItem(item)} className="btn btn-default btn-sm">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                            <tfoot>
                                <th><button onClick={this.decrement_n}>-</button>{this.state.n}<button onClick={this.increment_n}>+</button></th>
                                <th>
                                        <button onClick={(e) => this.clearAll()} className="btn btn-default btn-sm">Clear List</button>
                                </th>
                            </tfoot>
                        </table>
                    }
                </div>
                <button onClick={this.findRecipe} className="btn btn-default btn-sm">Search</button>
                
            </div>
        
        
            )
        }
        else{
            return (<div></div>)
        }
    }

    loadingScreen(){
        if(this.state.loading){
            return(
                <div>Loading</div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }



    render() {
        return(
            <div>
                <div>{this.loadHTML()}</div>
                <div>{this.itemLoader()}</div>
                <div>{this.loadingScreen()}</div>
            </div>
        )
    }
}

export default Items;
