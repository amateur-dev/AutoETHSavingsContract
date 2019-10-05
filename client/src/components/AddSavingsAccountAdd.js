import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import AutoETHSavingsAccount from '../contracts/AutoETHSavingsAccount.json';
import web3 from '../utils/getWeb3';
import WorkingWithTheBlockchain from './WorkingWithTheBlockchain';

class AddSavingsAccountAdd extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { addSavingsAccTxHash: null, showLoader: false };
    autoBind(this);
  }


    AddSavingsAccountAdd = async (event) => {
      event.preventDefault();
      console.log('calling the AddSavingsAccountAdd fx');
      web3 = await web3;
      const account = this.props.accounts;
      const deployedNetwork = this.props.deployedNetwork;
      const instance = new web3.eth.Contract(
        AutoETHSavingsAccount.abi,
        deployedNetwork && this.props.contractAddress,
      );
      const contract = instance;
      console.log('We got the instance and now calling the AddSavingsAccountAdd method');
      const SavingsAccountsAdd = this.refs.SavingsAccountsAdd.value;
      this.setState({ showLoader: true });
      try {
        await contract.methods.addSavingsAccounts(SavingsAccountsAdd).send({ from: account }).on('receipt', (receipt) => { this.setState({ addSavingsAccTxHash: receipt.transactionHash, showLoader: false }); }).on('error', (error) => { alert(error); this.setState({ showLoader: false }); });
      } catch (error) {
        console.log('there is an error', error);
      }
    };

    render() {
      return (
        <div>
          <form onSubmit={this.AddSavingsAccountAdd}>

                    Please provide the Account Address to which you want the marginal savings to be deposited:
            <div className="col-7">
              <input type="text" ref="SavingsAccountsAdd" />
            </div>

            <input className="ml-2 btn btn-primary" type="submit" value="Add Savings Account Address" />
          </form>
          <br />
          {this.state.showLoader ? <WorkingWithTheBlockchain /> : null}
          {this.state.addSavingsAccTxHash !== null ? (
            <p>
                    Yiphee! Your 'Add Savings Account' transaction has successfully been mined on the Blockchain.  The transaction hash is {this.state.addSavingsAccTxHash}
            </p>
          ) : null}
        </div>

      );
    }
}

export { AddSavingsAccountAdd };
