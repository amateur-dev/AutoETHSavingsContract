import React, { Component } from "react";


class CA extends Component {
  render() {
    return (
      <div>
      {this.props.contractAddress !== null ?(<div> <br />
      <br />
      <h3>Thank you! Your Contract has been deployed.  The Address of the Contract is {this.props.contractAddress} </h3></div>)
     : null
      }
      </div>
      
    );
  };
}


export default CA;