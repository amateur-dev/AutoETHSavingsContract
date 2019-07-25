var AutoETHSavingsAccount = artifacts.require("./AutoETHSavingsAccount.sol");

module.exports = function(deployer) {
  deployer.deploy(AutoETHSavingsAccount);
};
