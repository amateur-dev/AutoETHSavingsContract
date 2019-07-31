import React, { Component } from "react";
import AutoETHSavingsAccount from "../contracts/AutoETHSavingsAccount.json";
import web3 from "../utils/getWeb3";
import autoBind from 'react-autobind';

class AddSavingsAccountAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { depositTxHash: null };
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
        console.log("We got the instance and now calling the AddSavingsAccountAdd method")
        const SavingsAccountsAdd = this.refs.SavingsAccountsAdd.value;
        try { await contract.methods.addSavingsAccounts(SavingsAccountsAdd).send({ from: account }).on('transactionHash', (transactionHash) => this.setState({ depositTxHash: transactionHash }))}
        catch (error) {
            console.log("there is an error", error)
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
                {this.state.depositTxHash !== null ? (<p>
                    The Deposit Tx Hash is {this.state.depositTxHash}
                </p>) : null}
            </div>

        );
    }
}

export { AddSavingsAccountAdd };
