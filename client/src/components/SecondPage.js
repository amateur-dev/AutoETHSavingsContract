import React, { Component } from "react";
import AutoETHSavingsAccount from "../contracts/AutoETHSavingsAccount.json";
import getWeb3 from "../utils/getWeb3";

class SecondPage extends Component {
    constructor(props) {
        super(props);
        this.DepositETH = this.DepositETH.bind(this);
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



    DepositETH = async (event) => {
        event.preventDefault();
        console.log('calling the DepositETH fx');
        const web3 = await getWeb3();
        console.log(web3)
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        const networkId = await web3.eth.net.getId();
        console.log(networkId)
        const deployedNetwork = AutoETHSavingsAccount.networks[networkId];
        const instance = new web3.eth.Contract(
            AutoETHSavingsAccount.abi,
            deployedNetwork && this.state.contractAddress,
        );
        const contract = instance;
        await contract.methods.depositETH().send({ from: accounts[0], value: web3.utils.toWei('1', 'ether') })

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
            // const deployedNetwork = AutoETHSavingsAccount.networks[networkId];
            // const instance = new web3.eth.Contract(
            //   AutoETHSavingsAccount.abi,
            //   deployedNetwork && deployedNetwork.address,
            // );
            // console.log(instance)

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts });
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
                <button onClick={this.DepositETH}>DepositETH</button>
            </div>

        );
    }
}

export default SecondPage;
