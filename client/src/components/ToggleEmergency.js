import React, { Component } from "react";
import AutoETHSavingsAccount from "../contracts/AutoETHSavingsAccount.json";
import web3 from "../utils/getWeb3";
import autoBind from 'react-autobind';
import WorkingWithTheBlockchain from "./WorkingWithTheBlockchain";

class ToggleEmergency extends Component {
    constructor(props) {
        super(props);
        this.state = { ToggleEmergencyHash: null, showLoader: false };
        autoBind(this);
    }

    ToggleEmergency = async (event) => {
        event.preventDefault();
        console.log('calling the Toggle Emergency fx');
        web3 = await web3;
        const account = this.props.accounts;
        const deployedNetwork = this.props.deployedNetwork;
        // const deployedNetwork = AutoETHSavingsAccount.networks[networkId];
        const instance = new web3.eth.Contract(
            AutoETHSavingsAccount.abi,
            deployedNetwork && this.props.contractAddress,
        );

        const contract = instance;
        console.log("We got the instance and now calling the Toggle Emergency method")
        this.setState({ showLoader: true })
        await contract.methods.toggleContractActive().send({ from: account }).on("receipt", (receipt) => { console.log("the tx hash is", receipt["transactionHash"]); this.setState({ ToggleEmergency: receipt["transactionHash"], showLoader: false }) }).on('error', (error) => { alert(error); this.setState({ showLoader: false }) })
    };
    render() {
        // if (!this.state.web3) {
        //   return <div>Loading Web3, accounts, and contract...</div>;
        // }
        return (
            <div>
                <button onClick={this.ToggleEmergency} className="ml-2 btn btn-warning" type="submit">Toggle Emergency State</button>
                <br />

                {this.state.showLoader ? <WorkingWithTheBlockchain /> : null}

                {
                    this.state.ToggleEmergencyHash !== null ? (<p>
                        Your transaction to Toggle the Emergency State of the Contract has successfully been mined on the Blockchain.  The transaction hash is {this.state.ToggleEmergencyHash}
                    </p>) : null
                }
            </div >

        );
    }
}

export default ToggleEmergency;