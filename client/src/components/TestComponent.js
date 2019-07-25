import React, { Component } from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom';

class Counter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 5
      };
      // change code below this line
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
    this.reset = this.reset.bind(this);
      // change code above this line
    }
    // change code below this line
    increment(){
      this.setState({
        count: this.state.count + 1
      });
    }
    decrement(){
      this.setState({
        count: this.state.count - 1
      });
    }
    reset(){
      this.setState({
        count: 0
      });
    }
    // change code above this line
    render() {
      return (
        <div>
          <button className='inc' onClick={this.increment}>Increment!</button>
          <button className='dec' onClick={this.decrement}>Decrement!</button>
          <button className='reset' onClick={this.reset}>Reset</button>
          <h1>{this.state.count}</h1>
          <button><Link to="/">Back to Home</Link></button>
          
        </div>
      );
    }
  };

export default Counter;