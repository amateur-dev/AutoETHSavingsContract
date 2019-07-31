import React, { Component } from "react";


class CA extends Component {
  constructor(props) {
    super(props);
    this.state = { depositTxHash: null };
  }

  render() {
    return (
      <div>
      {this.props.contractAddress !== null ?
      <p>The Address of the Contract is {this.props.contractAddress} </p>: null
      }
      </div>
      
    );
  };
}


export default CA;