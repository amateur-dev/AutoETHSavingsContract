import React, { Component } from "react";
import AutoETHSavingsAccount from "../contracts/AutoETHSavingsAccount.json";
// import Ownable from "./contracts/Ownable.json";
// import ReentrancyGuard from "./contracts/RentrancyGuard.json";
// import SafeMath from "./contracts/SafeMath.json";
import getWeb3 from "../utils/getWeb3";


// import Counter from "./utils/TestComponent";
// import HomeComponent from "./utils/HomeComponent";
// import { BrowserRouter, Route, Link } from 'react-router-dom';

// import "./App.css";

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = { contractAddress:null, clicked:false };
    // this.state = { storageValue: "No value has been set", web3: null, accounts: null, contract: null };

    // this.handleChange = this.handleChange.bind(this);
    // this.deployContract = this.deployContract.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.showHi = this.showHi.bind(this);
  }
  // state = { storageValue: null, web3: null, accounts: null, contract: null };

  showHi = async (event) => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
    await fetch(url).then((resp) => resp.json()).then((data) => {
      const {usd:USD} = data.ethereum ||  {};
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
    const web3 = this.state.web3
    console.log("deploying the contract")
    const accounts = this.state.accounts;
    console.log(accounts)
    await new web3.eth.Contract(AutoETHSavingsAccount.abi).deploy({
      data: AutoETHSavingsAccount.bytecode,}).send({ from: accounts[0], gas: '1000000' })
      .on('error', (error) => {console.log(error)})
      .on('transactionHash', (transactionHash) => {alert("The Tx Hash is: " + transactionHash)})
      .on('receipt', (receipt) => {alert("The Contract Address is: " + receipt)});
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
      const deployedNetwork = AutoETHSavingsAccount.networks[networkId];
      // console.log(AutoETHSavingsAccount)  // this pulls out the object of the contract which gives the contract storage address and etc
      console.log(AutoETHSavingsAccount.networks[networkId].address)
      this.setState({contractAddress: AutoETHSavingsAccount.networks[networkId].address})
      const instance = new web3.eth.Contract(
        AutoETHSavingsAccount.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log(instance)

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

  renderContractAddress = () => {
    if (this.state.contractAddress !== null) {
      return (<p>
        The Contract Address is {this.state.contractAddress}
        </p>)
    } else { return (<p>
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
        { this.renderContractAddress()}
        <button onClick={this.showHi}>Submit</button>
        {this.state.clicked ? (<p>Hi there!</p>) : null }

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

export default FirstPage;
