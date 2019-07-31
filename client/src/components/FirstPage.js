import React, { Component } from "react";
import autoBind from 'react-autobind';
import AutoETHSavingsAccount from "../contracts/AutoETHSavingsAccount.json";
import web3 from "../utils/getWeb3";
import ContractFunctions from "./ContractFunctions"
import { Link } from 'react-router-dom';

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractAddress: null, oldContractAddress: null, clicked: false, txHash: null, hasContractAddress: false, hasOldContractAddress: false, web3: null, deployedNetwork: null, deployNewtContract: false, wantToInteractWithOldContract: false,
      OldContractButtonState: false, NewContractButtonState: false,
    };
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
    this.setState({ OldContractButtonState: true })
    console.log('calling the deploy contract fx');
    web3 = await web3;
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
    }).send({ from: accounts })
      .on('error', (error) => { alert(error) })
      .on('transactionHash', (transactionHash) => this.setState({ txHash: transactionHash }))
      .on('receipt', (receipt) => this.setState({ contractAddress: receipt.contractAddress, oldContractAddress: null }))
      .on('receipt', (receipt) => console.log("The ETH Address of the contract is", receipt.contractAddress))
    this.setState({ hasContractAddress: true })
    const deployedNetwork = {
      "events": {},
      "links": {},
      "address": this.state.contractAddress,
      "transactionHash": undefined
    }
    this.setState({ deployedNetwork: deployedNetwork })
  };

  AddOldContractAddress = (event) => {
    event.preventDefault();
    this.setState({ wantToInteractWithOldContract: true, NewContractButtonState: true })
  }

  GetOldContractInstance = async (event) => {
    event.preventDefault();
    if (web3.utils.isAddress(this.refs.OldContractAddress.value)) {
      web3 = await web3;
    // const accounts = this.props.location.state.accounts;
    const deployedNetwork = {
      "events": {},
      "links": {},
      "address": this.refs.OldContractAddress.value,
      "transactionHash": undefined
    };
    this.setState({ deployedNetwork: deployedNetwork, oldContractAddress: this.refs.OldContractAddress.value, contractAddress: null })
    // const instance = new web3.eth.Contract(
    //   AutoETHSavingsAccount.abi,
    //   deployedNetwork && this.refs.OldContractAddress.value,
    // );
    this.setState({ hasOldContractAddress: true })
    }
    else (alert("You have not entered a valid contract address"))
    
  }


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

        <h2>Would you like to depoly your new Auto ETH Savings Smart Contract or would you like to interact with an already deployed version of the Smart Contract?</h2><br />

        <button className="btn btn-primary m-2" onClick={this.deployContract} disabled={this.state.NewContractButtonState}>Deploy a New Contract</button>

        <button className="btn btn-info m-2" onClick={this.AddOldContractAddress} disabled={this.state.OldContractButtonState}>Interact with an Already Deployed Contract</button><br /><br />

        <Link to={{ pathname: "/" }}><button className="btn btn-info ml-2"><i className="small material-icons px-1">home</i>Back to the ReadMe Page</button><br /></Link>


        {this.state.wantToInteractWithOldContract ? <form onSubmit={this.GetOldContractInstance}>
          <br />
          
            Please provide the Address of the already deployed contract: 
            <br />
            <input type="text" ref="OldContractAddress" />
            <input className="ml-2 btn btn-primary" type="submit" value="Submit" />
            <br />
        </form> : null}



        {this.state.hasContractAddress ?
          (<div>
            <ContractFunctions contractAddress={this.state.contractAddress} deployedNetwork={this.state.deployedNetwork} networkId={this.props.location.state.networkId} accounts={this.props.location.state.accounts} />

          </div>)

          : null}

          {this.state.hasOldContractAddress ? 
          (<div>
            <ContractFunctions oldContractAddress={this.state.oldContractAddress} deployedNetwork={this.state.deployedNetwork} networkId={this.props.location.state.networkId} accounts={this.props.location.state.accounts} />

          </div>)

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
