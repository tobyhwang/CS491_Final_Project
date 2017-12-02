import React, { Component } from 'react';
// import Datastore from '@google-cloud/datastore';
// var datastore = Datastore();
import DBConnection from './db/DBConnection'
class TestDB extends Component {

        constructor(props){
                super(props);
                this.state ={
                message: 'ASSS'
        };

    }

    render(){
        return(
            <h1>{this.state.message}</h1>
        );
    }
}

export default TestDB;