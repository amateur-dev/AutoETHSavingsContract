import React, { PureComponent } from 'react';

class CA extends PureComponent {
  render() {
    return (
      <>
        {this.props.contractAddress !== null ? (
          <div> <br />
            <br />
            <h3>Thank you! Your Contract has been deployed.  The Address of the Contract is {this.props.contractAddress} </h3>
          </div>
        ) : null
      }
      </>
    );
  }
}


export default CA;
