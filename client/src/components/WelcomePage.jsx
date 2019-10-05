import React, { PureComponent } from 'react';
import { Redirect, Link } from 'react-router-dom';

import web3 from '../utils/getWeb3';

class WelcomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      metaMaskPresence: true,
      networkId: null,
      contractAddress: null,
      clicked: false,
      txHash: null,
      web3: null,
      accounts: null,
      currentNetwork: '',
      hasContractAddress: false,
      dummytext: 'test',
      redirect: false,
    };
  }

    setRedirect = () => {
      this.setState({
        redirect: true,
      });
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to="/FirstPage" />;
      }
      return null;
    }

    componentDidMount = async () => {
      try {
        web3 = await web3;
        // Use web3 to get the user's accounts.
        const Allaccounts = await web3.eth.getAccounts();
        const accounts = Allaccounts[0];
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkNames = { 1: 'MainNet', 3: 'Ropsten', 4: 'Rinkeby', 5777: 'LocalWeb3' };
        const currentNetwork = networkNames[networkId];
        if (currentNetwork !== undefined) {
          this.setState({ currentNetwork });
        } else {
        // eslint-disable-next-line no-console
          console.log('You are using a private / undefined / unidentified Ethereum network');
        }
        this.setState({ web3, accounts, networkId });
      } catch (error) {
        this.setState({ metaMaskPresence: false });
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    render() {
      const { metaMaskPresence, accounts, currentNetwork } = this.state;

      if (metaMaskPresence) {
        return (
          <>
            <h2 id="how-it-works">Welcome to Auto ETH Savings </h2>
            <br />
            <h5>Your account Id: { accounts === '' ? 'No account associated currently.' : accounts } </h5>
            <h5>CurrentNetwork: {currentNetwork}</h5>
            <p>
              <strong>
                <Link to={{
                  pathname: '/FirstPage',
                  state: { accounts: this.state.accounts, networkId: this.state.networkId },
                }}
                >
                Transfer money
                </Link>
              </strong>
            </p>
            <a href="https://gitlab.com/amateur-dev/autoethsavingsaccountsc/blob/master/AutoETHSavingsSC">
              View the contract
            </a>
        </>
        );
      }
      return (
        <>
        Hi, please connect your Metamask and reload the page. We have trouble showing data to you if your metmask is not connected.
        </>
      );
    }
}

export default WelcomePage;
