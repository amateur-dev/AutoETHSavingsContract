import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import Routes from "./Routes";
import Counter from "./utils/TestComponent";
import HomeComponent from "./utils/HomeComponent";
import { BrowserRouter, Route, Link } from 'react-router-dom';

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { storageValue: "No value has been set", web3: null, accounts: null, contract: null };

    // this.handleChange = this.handleChange.bind(this);
    this.deployContract = this.deployContract.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  // state = { storageValue: null, web3: null, accounts: null, contract: null };


  deployContract = async (event) => {
    event.preventDefault();
    console.log('calling the deploy contract fx');
    const web3 = this.state.web3
    console.log("deploying the contract")
    const accounts = this.state.accounts;
    console.log(accounts)
    await new web3.eth.Contract(SimpleStorageContract.abi).deploy({
      data: SimpleStorageContract.bytecode,}).send({ from: accounts[0], gas: '1000000' })
      .on('error', (error) => {console.log(error)})
      .on('transactionHash', (transactionHash) => {console.log(transactionHash)})
      .on('receipt', (receipt) => {console.log(receipt.contractAddress)});
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

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      // console.log(deployedNetwork)  // this pulls out the object of the contract which gives the contract storage address and etc
      // console.log(deployedNetwork.address)

      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

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
      <Routes />
        
        
        {/* <Counter /> */}
        
        {/* <h2>Would you like to depoly your Petty Cash Savings Smart Contract</h2>
        <button onClick={this.deployContract}>Submit</button> */}
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

export default App;
