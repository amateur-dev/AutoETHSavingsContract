import React, { Component } from "react";
import AutoETHSavingsAccount from "../contracts/AutoETHSavingsAccount.json";
import web3 from "../utils/getWeb3";
import autoBind from 'react-autobind';

class PayETH extends Component {
    constructor(props) {
        super(props);
        this.state = { paymentTxHash: null, savingsTxHash: null };
        autoBind(this);
    }


    PayETH = async (event) => {
        event.preventDefault();
        console.log('calling the PayETH fx');
        web3 = await web3;
        const account = this.props.accounts;
        const deployedNetwork = this.props.deployedNetwork;
        const instance = new web3.eth.Contract(
            AutoETHSavingsAccount.abi,
            deployedNetwork && this.props.contractAddress,
        );
        const contract = instance;
        console.log("We got the instance and now calling the PayETH method")
        const PayETHAmount = this.refs.PayETHAmount.value;
        const PayorETHAddress = this.refs.PayorETHAddress.value;
        const SavETHAmount = PayETHAmount * 0.01;
        console.log("The ETH that is going to be deposited in the savings account is ", SavETHAmount, typeof SavETHAmount);
        try { await contract.methods.payETH(PayorETHAddress, web3.utils.toWei(PayETHAmount, 'ether')).send({ from: account }).on('transactionHash', (transactionHash) => this.setState({ paymentTxHash: transactionHash })).on("error", console.error).then(await contract.methods.savePettyCash(web3.utils.toWei(SavETHAmount.toString(), 'ether')).send({ from: account }).on('transactionHash', (transactionHash) => this.setState({ savingsTxHash: transactionHash })).on("error", console.error)) }
        catch (error) {
            console.log(error)
        }


    };

    render() {
        return (
            <div>
                <form onSubmit={this.PayETH}>
                    <label>
                        Payor ETH Address: <input type="text" ref="PayorETHAddress" />
                    </label>
                    <label>
                        Amount in ETH: <input type="number" step="0.01" ref="PayETHAmount" />
                    </label>
                    <input type="submit" value="Pay ETH" />
                </form>

                {/* <button >DepositETH</button> */}
                {this.state.paymentTxHash !== null ? (<p>
                    The Payment Tx Hash is {this.state.paymentTxHash}
                </p>) : null}
            </div>

        );
    }
}

export default PayETH;
