import React, { Component } from "react";
import AutoETHSavingsAccount from "../contracts/AutoETHSavingsAccount.json";
import web3 from "../utils/getWeb3";
import autoBind from 'react-autobind';

class CheckBalance extends Component {
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
        console.log("accounts are ", account)
        const networkId = this.props.networkId;
        const deployedNetwork = AutoETHSavingsAccount.networks[networkId];
        const instance = new web3.eth.Contract(
            AutoETHSavingsAccount.abi,
            deployedNetwork && this.props.contractAddress,
        );
        const contract = instance;
        console.log("We got the instance and now calling the CheckBalance method")
        await contract.methods.balance().call({ from: account }).then((result) => this.setState({ WalletBalance: web3.utils.fromWei(result, 'ether') }))

    };


    render() {
        // if (!this.state.web3) {
        //   return <div>Loading Web3, accounts, and contract...</div>;
        // }
        return (
            <div>
                <button onClick={this.CheckBalance}>Check Wallet Balance</button>
                {this.state.WalletBalance !== null ? (<p>
                    The Wallet Balance is {this.state.WalletBalance} Ether
                </p>) : null}
            </div>

        );
    }
}

export default CheckBalance;
