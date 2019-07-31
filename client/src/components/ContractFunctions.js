import React, { Component } from "react";
import autoBind from 'react-autobind';
import CA from "./ContractAddress"
import DepositETH from "./DepositETH"
import CheckBalance from "./CheckBalanceETH"
import { AddSavingsAccountAdd } from "./AddSavingsAccountAdd"
import ToggleEmergency from "./ToggleEmergency"
import EmergencyWithdraw from "./EmergencyWithdraw"
import PayETH from "./PayETH"


class ContractFunctions extends Component {
    constructor(props) {
        super(props);
        this.state = { depositTxHash: null };
        autoBind(this);
    }

    render() {
        return (
            <div>
                {
                    this.props.oldContractAddress !== undefined ? (<div>
                        <br /><h2>Great! Following are the functions of the Smart Contract that you can use: </h2>
                        <br />
                        <CheckBalance deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.oldContractAddress} />
                        <br />
                        <DepositETH deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.oldContractAddress} />
                        <br />
                        <AddSavingsAccountAdd deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.oldContractAddress} />
                        <br />
                        <PayETH deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.oldContractAddress} />
                        <br />
                        <ToggleEmergency deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.oldContractAddress} />
                        <br />
                        <EmergencyWithdraw deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.oldContractAddress} />
                        <br />
                    </div>) : null
                }
                {
                    this.props.contractAddress !== undefined ?
                        (<div>
                            <CA contractAddress={this.props.contractAddress} /><br />
                            <h2>Following are the functions of the Smart Contract that you can use: </h2>
                            <br />
                            <DepositETH deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.contractAddress} />
                            <br />
                            <CheckBalance deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.contractAddress} />
                            <br />
                            <AddSavingsAccountAdd deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.contractAddress} />
                            <br />
                            <PayETH deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.contractAddress} />
                            <br />
                            <ToggleEmergency deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.contractAddress} />
                            <br />
                            <EmergencyWithdraw deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.contractAddress} />
                            <br />
                        </div>)
                        : null
                }


            </div>
        )
    }
}

export default ContractFunctions;