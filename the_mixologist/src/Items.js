import React, { Component } from 'react';
  
class Items extends Component {

  constructor(props){
  	super(props);
  	this.state ={
        items:['gin', 'whiskey', 'vodka'],
        message: ''
    };

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

    clearAll(){

        this.setState({
            items: [],
            message: 'No items are currently added'
        });
    }


render() {
    const{items, message} = this.state;
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
                      <caption>Ingredient List</caption>
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
                        <tr>
                            <td colSpan="1">&nbsp;</td>
                            <td className="text-right"></td>
                                <button onClick={(e) => this.clearAll()} className="btn btn-default btn-sm">Clear List</button>
                        </tr>
                      </tfoot>
                  </table>
              }
          </div>
      </div>


    );
  }
}


export default Items;
