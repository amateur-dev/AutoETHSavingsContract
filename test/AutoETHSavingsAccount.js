const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require('../client/src/contracts/AutoETHSavingsAccount');

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    AESC = await new web3.eth.Contract(abi)
        .deploy({
            data: bytecode,
        })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('AutoETHSavingsContract', () => {
    it('deploys a contract', () => {
        assert.ok(AESC.options.address);
    });

    it('accepts ETH using the deposit fx', async () => {
        await AESC.methods.depositETH().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const wallet_balance = await AESC.methods.balance().call(
            {
                from: accounts[0]
            });

        assert.equal(wallet_balance, 2000000000000000000);
    });

    it('accepts ETH as deposit from any account', async () => {
        await AESC.methods.depositETH().send({
            from: accounts[3],
            value: web3.utils.toWei('5', 'ether')
        });

        const wallet_balance = await AESC.methods.balance().call(
            {
                from: accounts[0]
            });

        assert.equal(wallet_balance, 5000000000000000000);
    });

    it('does not let accept an ETH address as savings account apart from the owner', async () => {
        try {
            await AESC.methods.addSavingsAccounts().send({
                from: accounts[1],
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('lets the owner Pay ETH to external party and auto save into the savings account', async () => {
        await AESC.methods.depositETH().send({
            from: accounts[0],
            value: web3.utils.toWei('5', 'ether')
        });
        await AESC.methods.addSavingsAccounts(accounts[9]).send({
            from: accounts[0],
        });

        await AESC.methods.payETH(accounts[8], web3.utils.toWei('4', 'ether'), web3.utils.toWei('0.04', 'ether')).send({
            from: accounts[0],
        });



        const payor_account_new_balance = await web3.eth.getBalance(accounts[8])
        const savings_account_new_balance = await web3.eth.getBalance(accounts[9])

        assert.equal(payor_account_new_balance, (104000000000000000000));
        assert.equal(savings_account_new_balance, (100040000000000000000));
    });
});
    // it('lets multiple addresses to enter', async () => {
    //     await AESC.methods.enterAESCContract().send({
    //         from: accounts[0],
    //         value: web3.utils.toWei('2', 'ether')
    //     });

    //     await AESC.methods.enterAESCContract().send({
    //         from: accounts[1],
    //         value: web3.utils.toWei('2', 'ether')
    //     });

    //     await AESC.methods.enterAESCContract().send({
    //         from: accounts[2],
    //         value: web3.utils.toWei('2', 'ether')
    //     });

    //     const players_list = await AESC.methods.getPlayers().call(
    //         {
    //             from: accounts[0]
    //         });

    //     assert.equal(accounts[0], players_list[0]);
    //     assert.equal(accounts[1], players_list[1]);
    //     assert.equal(accounts[2], players_list[2]);
    //     assert.equal(3, players_list.length);
    // });

    // it('needs the minimum eth', async () => {
    //     try {
    //         await AESC.methods.enterAESCContract().send({
    //             from: accounts[3],
    //             value: web3.utils.toWei('0.0001', 'ether')
    //         });
    //         assert(false);
    //     } catch (err) {
    //         assert(err);
    //     }
    // });

    // it('only manager can call the pickWinner', async () => {
    //     try {
    //         await AESC.methods.pickWinner().send({
    //             from: accounts[1],
    //         });
    //         assert(false);
    //     } catch (err) {
    //         assert(err);
    //     }
    // });

    // it('end to end testing', async () => {
    //     await AESC.methods.enterAESCContract().send({
    //         from: accounts[0],
    //         value: web3.utils.toWei('2', 'ether')
    //     });

    //     try {
    //         await AESC.methods.enterAESCContract().send({
    //             from: accounts[0],
    //             value: web3.utils.toWei('2', 'ether')
    //         });
    //     } catch (err) {
    //         assert(err);
    //     };

    //     await AESC.methods.pickWinner().send({
    //         from: accounts[0],
    //     });

    //     const balance = web3.eth.getBalance(accounts[0]);
    //     assert(balance > web3.utils.toWei('100', 'ether'));

    //     const contractbalance = web3.eth.getBalance(AESC.options.address);
    //     assert(contractbalance, 0);



    // });

// });