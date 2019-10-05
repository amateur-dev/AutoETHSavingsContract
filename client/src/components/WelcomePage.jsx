import React, { PureComponent } from 'react';
import { Redirect, Link } from 'react-router-dom';

import web3 from '../utils/getWeb3';

class WelcomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
        // Catch any errors for any of the above operations.
        // eslint-disable-next-line no-alert
        alert(
          'Failed to load web3, accounts, or contract. Check console for details.',
        );
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    render() {
      const { accounts, currentNetwork } = this.state;
      return (
        <>
          <h1 id="autoethsavingsaccount">AutoETHSavingsAccount DAPP</h1>
          <h2 id="about-the-dapp">About the DAPP</h2>
          <p>This DAPP lets you deploy a smart contract (the objective of which is discussed below) wallet onto the Ethereum blockchain.  The DAPP works with Metamask and hence for test purposes you can deploy it to any of the testnets.</p>
          <p>The objective of the DAPP is that whenever you make a payment to anyone through the smart contract, the DAPP will take 1% of the payment amount and do an auto saving for you.</p>
          <p>The DAPP is inspired by similar financial service offered by various banks today.   <a href="https://www.acorns.com/">Acrons</a>  has been offering this service in the US.  Here is a link to their explainer <a href="https://assets.acorns.com/videos/Spend+Web/spend_promo_2019_16-9.mp4">video</a>, for your reference and ease of understanding.</p>
          <h2 id="details-on-autosavingsaccount">Details on AutoSavingsAccount</h2>
          <p>With AutoSave, every payment that you make, leads to making 1% savings of it.  The Auto Save amount is transferred to another ETH account that you specify at the beginning - the other account is referred to as your <em>SavingsETHAccount</em>.  The idea is that you are autosaving some of your money (really small amounts), at the time of the expense and then can visit your <em>SavingsETHAccount</em> at the end of a period (eg a year, or 5 years) and then utilise those savings.</p>

          <br /> Here is a link to the contract <a href="https://gitlab.com/amateur-dev/autoethsavingsaccountsc/blob/master/AutoETHSavingsSC">[GO TO THE CONTRACT].</a><br /><br />

          <h2 id="how-it-works">How it works</h2><br />

          <h4 id="first-time-use">First Time Use</h4><br />
          <h5 id="depolyment-of-contract">Deployment of Contract</h5>
          <h5>Your account Id: { accounts === '' ? 'No account associated currently.' : accounts } </h5>
          <h5>CurrentNetwork: {currentNetwork}</h5>
          <p>At <mark>
            <strong>
              <Link to={{
                pathname: '/FirstPage',
                state: { accounts: this.state.accounts, networkId: this.state.networkId },
              }}
              >
                this page
              </Link>
            </strong>
                </mark>,you will see these two buttons: <br /><br />Button 1: <mark><code>Deploy A New Contract</code></mark> and <br /><br />
                Button 2: <mark><code>Interact with an Already Deployed Contract</code></mark>.

            <br /><br /> As it is obvious, using Button 1 will deploy the Auto Savings Smart Contract for you.

            <br /><br />Once deployed, you will be notified of the address of the Smart Contract and all the functions available in the Smart Contract will also be displayed.
          </p>

          <h5 id="adding-your-savings-account-address">Deposit ETH to your wallet address</h5>
          <p>You will have to deposit some ETH into this wallet, to utlise the main objective of this wallet dapp</p>
          {/* As an option, you will also see another button on the home page <code>Connect to Existing AutoSavingsAccount Smart Contract</code> -&gt; more on this in the following section. */}
          <h5 id="adding-your-savings-account-address">Adding your Savings Account Address</h5>
          <p>You will see another function call button \"Add Savings Account Address\".  Through this, you can provide the external wallet address that you want any of the savings to be deposited.  While it is recommended that you should only provide the wallet address to which you have a control (ie have access to the private keys), you are free to provide the wallet address of any of your loved ones (eg, spouse, children) etc.  </p>
          <blockquote>
            <p>Please note, this DAPP / Smart Contract does not let you take any control or manage the Savings Account that you provide. This Smart Contract only lets you compute a marginal savings amount and auto deposit it in your Savings Account.  You will have to control the Savings Account on your own.</p>
          </blockquote>
          <h5 id="making-the-payment-to-an-external-party">Making the Payment to an external Party</h5>
          <p>After adding your Savings Account -&gt; you can use the functions of making payment to any external payor.  Here you will provide the address to which you will make the normal payment and the amout of ETH.  Once you provide that and click the button <code>Pay ETH</code> the DAPP will compute 1% of the payment amount, and </p>
          <ol>
            <li><em>transfer the original amount</em> to the <em>external payee address</em> that you mentioned and</li>
            <li><em>transfer the 1% </em> to the <em>savings account</em> that you have provided earlier.</li>
          </ol>
          <h4 id="second-time-use">Second Time Use</h4>
          <h5 id="use-of-an-existing-autosavingsaccount-contract">Use of an existing AutoSavingsAccount Contract</h5>
          <p>As mentioned earlier, you will, at the beginining, get the option to interact with an already deployed Auto Save Contract. This is self explanatory. The reason for this is for you to re-visit this DAPP and make use of this DAPP once you have depolyed the contract. <br /> Once you connect your Existing AutoSavingsAccount Smart Contract, you can choose the same functions above.</p>
          <h2 id="things-to-note">Things to NOTE</h2>
          <ol>
            <li>As of now, you can add only one Savings Account to the Smart Contract.  If I get time, I will update the mechanism for you to add multiple Savings Account and the differential amount is then transferred to these accounts with a much complex logic.  Eg use cases, &#39;Year End Holiday Savings Account&#39;, &#39;Higher Education Savings Account&#39;.</li>
          </ol>

      </>
      );
    }
}

export default WelcomePage;
