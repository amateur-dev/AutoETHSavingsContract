import React, { Component } from "react";
import AutoETHSavingsAccount from "../contracts/AutoETHSavingsAccount.json";
import web3 from "../utils/getWeb3";
import autoBind from 'react-autobind';

class DepositETH extends Component {
    constructor(props) {
        super(props);
        this.state = { depositTxHash: null };
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

    handleFormSubmit(event) {
        event.preventDefault();
    }


    DepositETH = async (event) => {
        event.preventDefault();
        console.log('calling the DepositETH fx');
        web3 = await web3;
        const account = this.props.accounts;
        const networkId = this.props.networkId;
        const deployedNetwork = AutoETHSavingsAccount.networks[networkId];
        const instance = new web3.eth.Contract(
            AutoETHSavingsAccount.abi,
            deployedNetwork && this.props.contractAddress,
        );
        const contract = instance;
        console.log("We got the instance and now calling the deposit ETH method")
        const depositETHAmount = this.refs.depositETHAmount.value;
        await contract.methods.depositETH().send({ from: account, value: web3.utils.toWei(depositETHAmount, 'ether') }).on('transactionHash', (transactionHash) => {console.log(transactionHash); this.setState({ depositTxHash: transactionHash })})

        // console.log(accounts[0])
        // await new web3.eth.Contract(AutoETHSavingsAccount.abi).deploy({
        //   data: AutoETHSavingsAccount.bytecode,
        // }).send({ from: accounts, gas: '1000000' })
        //   .on('error', (error) => { console.log(error) })
        //   .on('transactionHash', (transactionHash) => { console.log("The Tx Hash is: " + transactionHash) })
        //   .on('receipt', (receipt) => { console.log(receipt.contractAddress) });
        // await new web3.eth.Contract(AutoETHSavingsAccount.abi).deploy({
        //     data: AutoETHSavingsAccount.bytecode,
        // }).send({ from: accounts, gas: '1000000' })
        //     .on('error', (error) => { console.log(error) })
        //     .on('transactionHash', (transactionHash) => this.setState({ txHash: transactionHash }))
        //     .on('receipt', (receipt) => this.setState({ contractAddress: receipt.contractAddress }))
        //     .on('receipt', (receipt) => console.log(receipt.contractAddress))
        // this.setState({ hasContractAddress: true })
    };



    // componentDidMount = async () => {
    //     try {
    //         // Get network provider and web3 instance.
    //         const web3 = await getWeb3();

    //         // Use web3 to get the user's accounts.
    //         const accounts = await web3.eth.getAccounts();
    //         console.log(accounts);

    //         // Get the contract instance.
    //         const networkId = await web3.eth.net.getId();
    //         console.log(networkId);
    //         // const deployedNetwork = AutoETHSavingsAccount.networks[networkId];
    //         // const instance = new web3.eth.Contract(
    //         //   AutoETHSavingsAccount.abi,
    //         //   deployedNetwork && deployedNetwork.address,
    //         // );
    //         // console.log(instance)

    //         // Set web3, accounts, and contract to the state, and then proceed with an
    //         // example of interacting with the contract's methods.
    //         this.setState({ web3, accounts });
    //     } catch (error) {
    //         // Catch any errors for any of the above operations.
    //         alert(
    //             `Failed to load web3, accounts, or contract. Check console for details.`,
    //         );
    //         console.error(error);
    //     }
    // };

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
            <div>
                <form onSubmit={this.DepositETH}>
                    <label>
                        Amount in ETH: <input type="number" step="0.01" ref="depositETHAmount" />
                    </label>
                    <input type="submit" value="Deposit ETH" />
                </form>

                {/* <button >DepositETH</button> */}
                {this.state.depositTxHash !== null ? (<p>
                    The Deposit Tx Hash is {this.state.depositTxHash}
                </p>) : null}
            </div>

        );
    }
}

export default DepositETH;
