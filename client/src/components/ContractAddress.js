import React, { Component } from "react";


class CA extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        The Contract Address is {this.props.contractAddress}
      </div>
    );
  };
}


export default CA;