import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import AutoETHSavingsAccount from '../contracts/AutoETHSavingsAccount.json';
import web3 from '../utils/getWeb3';
import WorkingWithTheBlockchain from './WorkingWithTheBlockchain';

class EmergencyWithdraw extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { EmergencyWithdrawHash: null, showLoader: false };
    autoBind(this);
  }

    EmergencyWithdraw = async (event) => {
      event.preventDefault();
      console.log('calling the Toggle Emergency fx');
      web3 = await web3;
      const account = this.props.accounts;
      const deployedNetwork = this.props.deployedNetwork;
      // const deployedNetwork = AutoETHSavingsAccount.networks[networkId];
      const instance = new web3.eth.Contract(
        AutoETHSavingsAccount.abi,
        deployedNetwork && this.props.contractAddress,
      );

      const contract = instance;
      console.log('We got the instance and now calling the Emergency Withdraw method');
      this.setState({ showLoader: true });
      await contract.methods.withdraw().send({ from: account }).on('receipt', (receipt) => { console.log('the tx hash is', receipt.transactionHash); this.setState({ EmergencyWithdrawHash: receipt.transactionHash, showLoader: false }); }).on('error', (error) => { alert(error); this.setState({ showLoader: false }); });
    };

    render() {
      // if (!this.state.web3) {
      //   return <div>Loading Web3, accounts, and contract...</div>;
      // }
      return (
        <div>
          <button onClick={this.EmergencyWithdraw} className="ml-2 btn btn-danger" type="submit">Emergency Withdraw</button>
          <br />
          <label>You need to ensure that the Emergengy Switch is turn on, by using the Toggle Emergency Button above, before using this</label>
          <br />
          <br />

          {this.state.showLoader ? <WorkingWithTheBlockchain /> : null}

          {
                    this.state.EmergencyWithdrawHash !== null ? (
                      <p>
                        Your transaction to Withdraw all balance in the Contract (under an Emergency) has successfully been mined on the Blockchain.  The transaction hash is {this.state.EmergencyWithdrawHash}
                      </p>
                    ) : null
                }
        </div>

      );
    }
}

export default EmergencyWithdraw;
