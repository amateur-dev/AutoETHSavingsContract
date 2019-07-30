import React, { Component } from "react";
import autoBind from 'react-autobind';
import CA from "./ContractAddress"
import DepositETH from "./DepositETH"
import CheckBalance from "./CheckBalanceETH"
import { AddSavingsAccountAdd } from "./AddSavingsAccountAdd"
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
            <CA contractAddress={this.props.contractAddress} />
            <DepositETH deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.contractAddress} />
            <CheckBalance deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.contractAddress} />
            <AddSavingsAccountAdd deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.contractAddress} />
            <PayETH deployedNetwork={this.props.deployedNetwork} networkId={this.props.networkId} accounts={this.props.accounts} contractAddress={this.props.contractAddress} />


             </div>
        )
    }
}

export default ContractFunctions;