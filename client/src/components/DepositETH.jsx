import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import AutoETHSavingsAccount from '../contracts/AutoETHSavingsAccount.json';
import web3 from '../utils/getWeb3';
import WorkingWithTheBlockchain from './WorkingWithTheBlockchain';

class DepositETH extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { depositTxHash: null, showLoader: false };
    autoBind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
  }


    DepositETH = async (event) => {
      event.preventDefault();
      console.log('calling the DepositETH fx');
      web3 = await web3;
      const account = this.props.accounts;
      const deployedNetwork = this.props.deployedNetwork;
      // const deployedNetwork = AutoETHSavingsAccount.networks[networkId];
      const instance = new web3.eth.Contract(
        AutoETHSavingsAccount.abi,
        deployedNetwork && this.props.contractAddress,
      );

      const contract = instance;
      console.log('We got the instance and now calling the deposit ETH method');
      const depositETHAmount = this.refs.depositETHAmount.value;
      this.setState({ showLoader: true });
      await contract.methods.depositETH().send({ from: account, value: web3.utils.toWei(depositETHAmount, 'ether') }).on('receipt', (receipt) => { console.log('the tx hash of the deposit function is', receipt.transactionHash); this.setState({ depositTxHash: receipt.transactionHash, showLoader: false }); }).on('error', (error) => { alert(error); this.setState({ showLoader: false }); });
    };


    render() {
      return (
        <div>
          <form onSubmit={this.DepositETH}>
            <br />
                    Please input the ETH (upto 2 decimal points is OK) that you would like to deposit in the Wallet
            <br />
            <label>
              <input type="number" step="0.01" ref="depositETHAmount" />
            </label>
            <input className="ml-2 btn btn-primary" type="submit" value="Deposit ETH" />
          </form>
          <br />
          {this.state.showLoader ? <WorkingWithTheBlockchain /> : null}

          {this.state.depositTxHash !== null ? (
            <p>
                    Yiphee! Your 'Deposit ETH' transaction has successfully been mined on the Blockchain.  The transaction hash is {this.state.depositTxHash}
            </p>
          ) : null}
        </div>

      );
    }
}

export default DepositETH;
