import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import AutoETHSavingsAccount from '../contracts/AutoETHSavingsAccount.json';
import web3 from '../utils/getWeb3';

class CheckBalance extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { WalletBalance: null };
    autoBind(this);
  }


    CheckBalance = async (event) => {
      event.preventDefault();
      console.log('calling the CheckBalance fx');
      web3 = await web3;
      const account = this.props.accounts;
      const deployedNetwork = this.props.deployedNetwork;
      const instance = new web3.eth.Contract(
        AutoETHSavingsAccount.abi,
        deployedNetwork && this.props.contractAddress,
      );
      const contract = instance;
      console.log('We got the instance and now calling the CheckBalance method');
      // await contract.methods.balance().call({ from: account }).then((result) => { this.setState({ WalletBalance: web3.utils.fromWei(result, 'ether') }); console.log(result) })
      let valueInMilli = null;
      await contract.methods.balance().call({ from: account }).then((result) => { valueInMilli = web3.utils.fromWei(result, 'milli'); });
      console.log('value in Milli', valueInMilli);
      const valueInETH = valueInMilli / 1000;
      this.setState({ WalletBalance: valueInETH });
      // await contract.methods.balance().call({ from: account }).then((result) => this.setState({ WalletBalance: web3.utils.fromWei(result, 'ether') }))
    };


    render() {
      // if (!this.state.web3) {
      //   return <div>Loading Web3, accounts, and contract...</div>;
      // }
      return (
        <div>
          <button className="ml-2 btn btn-primary" onClick={this.CheckBalance}>Check Wallet Balance</button>
          <br />
          <br />
          {this.state.WalletBalance !== null ? (
            <h4>
                    The Wallet Balance is {this.state.WalletBalance} Ether
            </h4>
          ) : null}
        </div>

      );
    }
}

export default CheckBalance;
