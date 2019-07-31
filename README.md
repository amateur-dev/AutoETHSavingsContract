# AutoETHSavingsAccount

##  About the DAPP

This DAPP lets you deploy a smart contract wallet onto the Ethereum blockchain.  The DAPP works with Metamask and hence for test purposes you can deploy it to any of the testnets.

The objective of the DAPP is that whenever you make a payment to anyone through the smart contract, the DAPP will round the payment amout it up to the nearest **XXX** and do an auto saving for you.  

The DAPP is inspired by similar financial service offered by various banks today.   [Acrons](https://www.acorns.com/)  has been offering this service in the US.  Here is a link to their explainer [video](https://assets.acorns.com/videos/Spend+Web/spend_promo_2019_16-9.mp4), for your reference and ease of understanding.

## Details on AutoSavingsAccount

With AutoSave, every payment that you make is rounded up to the nearest and the extra amount is transferred to another ETH account that you specify at the beginning - the other account is referred to as your _SavingsETHAccount_.  The idea is that you are autosaving some of your money (really small amounts), at the time of the expense and then can visit your _SavingsETHAccount_ at the end of a period (eg a year, or 5 years) and then utilise those savings.  

## How it works

#### First Time Use

#####    Depolyment of Contract
At the home page, you will see a button with says `deploy contract`.  Using this button will deploy the contract for you.  Here is a link to the contract [DIPESH TO INSERT THE LINK TO THE CONTRACT].  You will be notified of the address of the Smart Contract.  As an option, you will also see another button on the home page `Connect to Existing AutoSavingsAccount Smart Contract` -> more on this in the following section.

#####    Adding your Savings Account Address
Once you have the address of the AutoSavingsAccount, you can visit the page `Add Savings Account`.  In this page, you can provide the external wallet address that you want any of the savings to be deposited.  While it is recommended that you should only provide the wallet address to which you have a control (ie have access to the private keys), you are free to provide the wallet address of any of your loved ones (eg, spouse, children) etc.  

> Please note, this DAPP / Smart Contract does not let you take any control or manage the Savings Account that you provide. This Smart Contract only lets you round up your expense and auto deposit the rounding up difference in your Savings Account.  You will have to control the Savings Account on your own.

#####    Making the Payment to an external Party
After adding your Savings Account -> you can visit the page `Make Payment`.  Here you will provide the address to which you will make the normal payment and the amout of ETH.  Once you provide that and click the button `Pay` the DAPP will compute the rounding up differential and make the payment to 
1.  _of the original amount_ to the _external payee address_ that you mentioned and
2.  _the rounding up differential_ to the _savings account_ that you have provided earlier.

#### Second Time Use

#####    Use of an existing AutoSavingsAccount Contract
At the home page, you will also see another button on the home page `Connect to Existing AutoSavingsAccount Smart Contract`.  This is self explanatory.  Once you connect your Existing AutoSavingsAccount Smart Contract, you can choose to visit either the `Add Savings Account` or `Make Payment` and continue as normal.

## Things to NOTE

1. As of now, you can add only one Savings Account to the Smart Contract.  If I get time, I will update the mechanism for you to add multiple Savings Account and the differential amount is then transferred to these accounts with a much complex logic.  Eg use cases, 'Year End Holiday Savings Account', 'Higher Education Savings Account'.
