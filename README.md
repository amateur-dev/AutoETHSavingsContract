# AutoETHSavingsAccount {Consensys BootCamp Final Project}

##  About the DAPP

This DAPP lets you deploy a smart contract (the objective of which is discussed below) wallet onto the Ethereum blockchain. The DAPP works with Metamask and hence for test purposes you can deploy it to any of the testnets.

The objective of the DAPP is that whenever you make a payment to anyone through the smart contract, the DAPP will take 1% of the payment amount and do an auto saving for you.

The DAPP is inspired by similar financial service offered by various banks today.   [Acrons](https://www.acorns.com/)  has been offering this service in the US.  Here is a link to their explainer [video](https://assets.acorns.com/videos/Spend+Web/spend_promo_2019_16-9.mp4), for your reference and ease of understanding.

## About the Author

So before you dive into reviewing my work, one key thing that I would like to highlight to you is that I am NOT a developer either by profession or academically trained.  Hence, please judge me as if you are judging a noob on this project.  I have hobby coding experience in Python and Flask.  I am picking up on Django.  I literally learnt all React, ES6 (damn those async, await functions) and Solidity for this project.


## Details on AutoSavingsAccount

With AutoSave, every payment that you make, leads to making 1% savings of it. The Auto Save amount is transferred to another ETH account that you specify at the beginning - the other account is referred to as your _SavingsETHAccount_. The idea is that you are autosaving some of your money (really small amounts), at the time of the expense and then can visit your _SavingsETHAccount_ at the end of a period (eg a year, or 5 years) and then utilise those savings.

Here is a link to the [contract](https://github.com/amateur-dev/truffle-react-simple-storage-string/blob/master/contracts/AutoETHSavingsAccount.sol).

# Details on how to run

1. Clone the repo
2. Run `npm install` in your terminal
3. Deploying on TestNet (Mainnet can also be used)
    * Run the following command from the root directory:
        1. run `npm run start`
        2. visit http://localhost:3000/
        3. You will see all the detailed instructions
4. Deploying on Ganache GUI network
    1. Assuming you have truffle installed: run `truffle compile`
    2. Run `truffle migrate`.  This will deploy the contract to the local blockchain running through Ganache GUI on port `7545` 
    3. run `npm run start`
    4. visit http://localhost:3000/
    5. You will see all the detailed instructions

## My Version of the Auto Save Smart Contract has been deployed on the Rinkeby Test Net. The Address is 0x1f540d8a2f64656f207f48204Dd899648486b79F

## Things to NOTE

1. As of now, you can add only one Savings Account to the Smart Contract.  If I get time, I will update the mechanism for you to add multiple Savings Account and the differential amount is then transferred to these accounts with a much complex logic.  Eg use cases, 'Year End Holiday Savings Account', 'Higher Education Savings Account'.
