import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';

class NotFound extends PureComponent {
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

  render() {
    return (
      <div>
        <p>Not Found</p>
      </div>
    );
  }
}

export default NotFound;
