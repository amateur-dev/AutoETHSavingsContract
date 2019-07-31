const AutoETHSavingsAccount = artifacts.require("./AutoETHSavingsAccount.sol");

contract("AutoETHSavingsAccount", accounts => {
    it("...should depsit ETH.", async () => {
        const AutoETHSavingsAccountInstance = await AutoETHSavingsAccount.deployed();

        // Deposit ETH
        await AutoETHSavingsAccountInstance.depositETH({ from: accounts[4], value: 50000000000000000000 });

        // Get Balance
        const AutoETHSavingsAccountBalance = await AutoETHSavingsAccountInstance.balance.call();

        assert.equal(AutoETHSavingsAccountBalance, 50000000000000000000, "The balance in the Contract is not 50 ETH");
    });
    it("...only the Owner should be able to should add an ETH Address as a Savings Account", async () => {
        const AutoETHSavingsAccountInstance = await AutoETHSavingsAccount.deployed();
        const savingsAccount = accounts[1]

        // Adding a Savings Account Address
        const AutoETHSavingsAddSavingsAccountAddress = await AutoETHSavingsAccountInstance.addSavingsAccounts({ savingsAccount, from: accounts[2] })

        assert.catchRevert(AutoETHSavingsAddSavingsAccountAddress, "Throwing an error");
    });

});
