import React, { Component } from "react";
import AutoETHSavingsAccount from "../contracts/AutoETHSavingsAccount.json";
import web3 from "../utils/getWeb3";
import autoBind from 'react-autobind';
import WorkingWithTheBlockchain from "./WorkingWithTheBlockchain";

class PayETH extends Component {
    constructor(props) {
        super(props);
        this.state = { paymentTxHash: null, savingsTxHash: null, showLoader: false };
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
        this.setState({ showLoader: true })
        try {
            await contract.methods.payETH(PayorETHAddress, web3.utils.toWei(PayETHAmount, 'ether'), web3.utils.toWei(SavETHAmount.toString(), 'ether')).send({ from: account }).on('receipt', (receipt) => { this.setState({ paymentTxHash: receipt["transactionHash"], showLoader: false }) }).on('error', (error) => { alert(error); this.setState({ showLoader: false }) })
        }
        catch (error) {
            console.log(error)
        }

    };

    render() {
        return (
            <div>
                <form onSubmit={this.PayETH}>

                    Payor ETH Address:
                    <div className="col-7">
                        <input type="text" ref="PayorETHAddress" />
                    </div>
                    <br />
                    Amount in ETH:
                    <div className="col-4">
                        <input type="number" step="0.01" ref="PayETHAmount" />
                    </div>
                    <input className="ml-2 btn btn-primary" type="submit" value="Pay ETH" />
                </form>
                <br />

                {this.state.showLoader ? <WorkingWithTheBlockchain /> : null}
                {this.state.paymentTxHash !== null ? (<p>
                    Yiphee! Your Payment transaction has successfully been mined on the Blockchain.  The transaction hash is {this.state.paymentTxHash}
                </p>) : null}
            </div>

        );
    }
}

export default PayETH;
