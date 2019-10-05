import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import AutoETHSavingsAccount from '../contracts/AutoETHSavingsAccount.json';
import web3 from '../utils/getWeb3';
import ContractFunctions from './ContractFunctions';
import WorkingWithTheBlockchain from './WorkingWithTheBlockchain';

class FirstPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contractAddress: null,
      oldContractAddress: null,
      clicked: false,
      txHash: null,
      hasContractAddress: false,
      hasOldContractAddress: false,
      web3: null,
      deployedNetwork: null,
      deployNewtContract: false,
      wantToInteractWithOldContract: false,
      OldContractButtonState: false,
      NewContractButtonState: false,
      showLoader: false,
    };
    autoBind(this);
  }

  showHi = async () => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
    await fetch(url).then(resp => resp.json()).then((data) => {
      const { usd: USD } = data.ethereum || {};
      if (USD == null) {
        throw new Error('There is no value for USD');
      } else {
        console.log(USD);
      }
    });
  }

  deployContract = async (event) => {
    event.preventDefault();
    this.setState({ OldContractButtonState: true });
    console.log('calling the deploy contract fx');
    web3 = await web3;
    console.log('deploying the contract');
    // eslint-disable-next-line react/prop-types
    const accounts = this.props.location.state.accounts;
    this.setState({ showLoader: true });
    await new web3.eth.Contract(AutoETHSavingsAccount.abi).deploy({
      data: AutoETHSavingsAccount.bytecode,
    }).send({ from: accounts })
      // eslint-disable-next-line no-alert
      .on('error', (error) => { alert(error); this.setState({ showLoader: false }); })
      .on('transactionHash', transactionHash => this.setState({ txHash: transactionHash }))
      .on('receipt', receipt => this.setState({ showLoader: false, contractAddress: receipt.contractAddress, oldContractAddress: null }))
      // eslint-disable-next-line no-console
      .on('receipt', receipt => console.log('The ETH Address of the contract is', receipt.contractAddress));
    this.setState({ hasContractAddress: true });
    const deployedNetwork = {
      events: {},
      links: {},
      address: this.state.contractAddress,
      transactionHash: undefined,
    };
    this.setState({ deployedNetwork });
  };

  AddOldContractAddress = (event) => {
    event.preventDefault();
    this.setState({ wantToInteractWithOldContract: true, NewContractButtonState: true });
  }

  GetOldContractInstance = async (event) => {
    event.preventDefault();
    web3 = await web3;

    if (web3.utils.isAddress(this.refs.OldContractAddress.value)) {
      const deployedNetwork = {
        events: {},
        links: {},
        address: this.refs.OldContractAddress.value,
        transactionHash: undefined,
      };
      this.setState({ deployedNetwork, oldContractAddress: this.refs.OldContractAddress.value, contractAddress: null });
      // const instance = new web3.eth.Contract(
      //   AutoETHSavingsAccount.abi,
      //   deployedNetwork && this.refs.OldContractAddress.value,
      // );
      this.setState({ hasOldContractAddress: true });
    } else (alert('You have not entered a valid contract address'));
  }

  renderContractAddress = () => {
    if (this.state.contractAddress !== null) {
      return (
        <p>
        The Contract Address is {this.state.contractAddress}
        </p>
      );
    }
    return (
      <p>
        The Contract Address cannot be retrieved
      </p>
    );
  }

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set("new value").send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };


  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <div className="App">

        <h2>Would you like to depoly your new Auto ETH Savings Smart Contract or would you like to interact with an already deployed version of the Smart Contract?</h2><br />

        <button className="btn btn-primary m-2" onClick={this.deployContract} disabled={this.state.NewContractButtonState}>Deploy a New Contract</button>

        <button className="btn btn-info m-2" onClick={this.AddOldContractAddress} disabled={this.state.OldContractButtonState}>Interact with an Already Deployed Contract</button><br /><br />

        <Link to={{ pathname: '/' }}><button className="btn btn-info ml-2"><i className="small material-icons px-1">home</i>Back to the ReadMe Page</button><br /></Link>
        <br />
        <br />
        {this.state.showLoader ? <WorkingWithTheBlockchain /> : null}


        {this.state.wantToInteractWithOldContract ? (
          <form onSubmit={this.GetOldContractInstance}>
            <br />

          Please provide the Address of the already deployed contract:
            <br />
            <input type="text" ref="OldContractAddress" />
            <input className="ml-2 btn btn-primary" type="submit" value="Submit" />
            <br />
          </form>
        ) : null}


        {this.state.hasContractAddress ?
          (
            <div>
              <ContractFunctions contractAddress={this.state.contractAddress} deployedNetwork={this.state.deployedNetwork} networkId={this.props.location.state.networkId} accounts={this.props.location.state.accounts} />
            </div>
          )

          : null}

        {this.state.hasOldContractAddress ?
          (
            <div>
              <ContractFunctions oldContractAddress={this.state.oldContractAddress} deployedNetwork={this.state.deployedNetwork} networkId={this.props.location.state.networkId} accounts={this.props.location.state.accounts} />

            </div>
          )

          : null}
      </div>

    );
  }
}

export default FirstPage;
