import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';

class HomeComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
    };
    autoBind(this);
  }

  // change code below this line
  increment() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  decrement() {
    this.setState({
      count: this.state.count - 1,
    });
  }

  reset() {
    this.setState({
      count: 0,
    });
  }

  // change code above this line
  render() {
    return (
      <div>
        {/* <button className='inc' onClick={this.increment}>Increment!</button>
          <button className='dec' onClick={this.decrement}>Decrement!</button>
          <button className='reset' onClick={this.reset}>Reset</button> */}
        <h1>Home PureComponent</h1>
        <Link to="/Counter">Counter</Link>
      </div>
    );
  }
}

export default HomeComponent;
