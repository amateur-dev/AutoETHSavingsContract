import React, { Component } from "react";
import autoBind from 'react-autobind';
import AutoETHSavingsAccount from "../contracts/AutoETHSavingsAccount.json";
import web3 from "../utils/getWeb3";
import CA from "./ContractAddress"
import DepositETH from "./DepositETH"
import CheckBalance from "./CheckBalanceETH"
import { AddSavingsAccountAdd } from "./AddSavingsAccountAdd"
import PayETH from "./PayETH"

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = { contractAddress: null, clicked: false, txHash: null, hasContractAddress: false, web3: null };
    autoBind(this);
  }


  showHi = async (event) => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
    await fetch(url).then((resp) => resp.json()).then((data) => {
      const { usd: USD } = data.ethereum || {};
      if (USD == null) {
        throw new Error("There is no value for USD")
      } else {
        console.log(USD)
      }
    });

  }



  deployContract = async (event) => {
    event.preventDefault();
    console.log('calling the deploy contract fx');
    web3 = await web3;
    // console.log(web3)
    console.log("deploying the contract");
    const accounts = this.props.location.state.accounts;
    // console.log(accounts[0])
    // await new web3.eth.Contract(AutoETHSavingsAccount.abi).deploy({
    //   data: AutoETHSavingsAccount.bytecode,
    // }).send({ from: accounts, gas: '1000000' })
    //   .on('error', (error) => { console.log(error) })
    //   .on('transactionHash', (transactionHash) => { console.log("The Tx Hash is: " + transactionHash) })
    //   .on('receipt', (receipt) => { console.log(receipt.contractAddress) });
    await new web3.eth.Contract(AutoETHSavingsAccount.abi).deploy({
      data: AutoETHSavingsAccount.bytecode,
    }).send({ from: accounts, gas: '1000000' })
      .on('error', (error) => { console.log(error) })
      .on('transactionHash', (transactionHash) => this.setState({ txHash: transactionHash }))
      .on('receipt', (receipt) => this.setState({ contractAddress: receipt.contractAddress }))
      .on('receipt', (receipt) => console.log(receipt.contractAddress))
    this.setState({ hasContractAddress: true })
  };


  // handleChange(event) {
  //   event.preventDefault();
  //   console.log("initiating the handle change event")
  //   const newValue = this.element.value;
  //   console.log("newValue is " + newValue);
  //   const accounts = this.state.accounts;
  //   const contract = this.state.contract;

  //   async function newfuntion() {
  //     await contract.methods.set(newValue).send({ from: accounts[0] });
  //   };
  //   newfuntion();

  //   this.setState({ storageValue: newValue });
  // }
  // 

  // handleSubmit(event) {
  //   // alert('A name was submitted: ' + this.state.storageValue);
  //   event.preventDefault();
  // }



  renderContractAddress = () => {
    if (this.state.contractAddress !== null) {
      return (<p>
        The Contract Address is {this.state.contractAddress}
      </p>)
    } else {
      return (<p>
        The Contract Address cannot be retrieved
    </p>)
    }

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
        {/* {this.renderContractAddress()}
        <button onClick={this.showHi}>Submit</button>
        {this.state.clicked ? (<p>Hi there!</p>) : null} */}

        {/* <Counter /> */}

        <h2>Would you like to depoly your Petty Cash Savings Smart Contract</h2>
        <button onClick={this.deployContract}>Submit</button>
        {this.state.hasContractAddress ?
          <div>
            <CA contractAddress={this.state.contractAddress} />
            <DepositETH networkId={this.props.location.state.networkId} accounts={this.props.location.state.accounts} contractAddress={this.state.contractAddress} />
            <CheckBalance networkId={this.props.location.state.networkId} accounts={this.props.location.state.accounts} contractAddress={this.state.contractAddress} />
            <AddSavingsAccountAdd networkId={this.props.location.state.networkId} accounts={this.props.location.state.accounts} contractAddress={this.state.contractAddress} />
            <PayETH networkId={this.props.location.state.networkId} accounts={this.props.location.state.accounts} contractAddress={this.state.contractAddress} />


          </div>

          : null}

        {/* <form onSubmit={this.deployContract}>
          <input type="submit" value="Submit"/>
        </form> */}
        {/* <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          that "No value has been set" in the Smart Contract.
        </p>
        <p> */}
        {/* Try changing the value stored on <strong>line 40</strong> of App.js. */}
        {/* Use the form below to update the value of the string stored in the smart contract:
        </p> */}
        {/* <form onSubmit={this.handleChange}>
          <label>
            Name:
            <input type="text" name="name" ref={el => this.element = el} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div>The stored value is: {this.state.storageValue}</div> */}
      </div>

    );
  }
}

export default FirstPage;
