# AutoETHSavingsAccount {Consensys BootCamp Final Project}

##  About the DAPP

This DAPP lets you deploy a smart contract (the objective of which is discussed below) wallet onto the Ethereum blockchain. The DAPP works with Metamask and hence for test purposes you can deploy it to any of the testnets.

The objective of the DAPP is that whenever you make a payment to anyone through the smart contract, the DAPP will take 1% of the payment amount and do an auto saving for you.

The DAPP is inspired by similar financial service offered by various banks today.   [Acrons](https://www.acorns.com/)  has been offering this service in the US.  Here is a link to their explainer [video](https://assets.acorns.com/videos/Spend+Web/spend_promo_2019_16-9.mp4), for your reference and ease of understanding.

## Details on AutoSavingsAccount

With AutoSave, every payment that you make, leads to making 1% savings of it. The Auto Save amount is transferred to another ETH account that you specify at the beginning - the other account is referred to as your _SavingsETHAccount_. The idea is that you are autosaving some of your money (really small amounts), at the time of the expense and then can visit your _SavingsETHAccount_ at the end of a period (eg a year, or 5 years) and then utilise those savings.

Here is a link to the [contract](https://github.com/amateur-dev/truffle-react-simple-storage-string/blob/master/contracts/AutoETHSavingsAccount.sol).

# Details on how to run

1. Clone the repo
2. Deploying on TestNet (Mainnet can also be used)
  1. cd client
  2. run `npm install` in your terminal
  3. run `npm start`
  4. visit http://localhost:3000/
  5. You will see all the detailed instructions
3. Deploying on Ganache GUI network
  1. run `npm install` in your terminal
  1. Assuming you have truffle installed: run `truffle compile`
  2. Next, run `truffle migrate`.  This will deploy the contract to the local blockchain running through Ganache GUI on port `7545` 
  3. cd client
  4. run `npm install`
  5. run `npm start`
  6. visit http://localhost:3000/
  7. You will see all the detailed instructions

## Things to NOTE

1. As of now, you can add only one Savings Account to the Smart Contract.  If I get time, I will update the mechanism for you to add multiple Savings Account and the differential amount is then transferred to these accounts with a much complex logic.  Eg use cases, 'Year End Holiday Savings Account', 'Higher Education Savings Account'.
