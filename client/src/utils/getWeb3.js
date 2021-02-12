import Web3 from 'web3';

const getWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      return (web3);
    } catch (error) {
      console.log(error);
    }
  } else if (window.web3) {
    //   // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    return (web3);
  } else {
    const provider = await new Web3.providers.HttpProvider(
      'http://127.0.0.1:7545',
    );
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return (web3);
  }
  return null;
};

const web3 = getWeb3();

export default web3;
