pragma solidity ^0.5.0;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be aplied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 */
contract ReentrancyGuard {
    // counter to allow mutex lock with only one SSTORE operation
    uint256 private _guardCounter;

    constructor () internal {
        // The counter starts at one to prevent changing it from zero to a non-zero
        // value, which is a more expensive operation.
        _guardCounter = 1;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and make it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _guardCounter += 1;
        uint256 localCounter = _guardCounter;
        _;
        require(localCounter == _guardCounter, "ReentrancyGuard: reentrant call");
    }
}

contract Ownable {

  address payable public owner;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  
  function transferOwnership(address payable newOwner) external onlyOwner {
    require(newOwner != address(0));      
    owner = newOwner;
  }

}

library SafeMath {
    
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }


    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;

        return c;
    }

   
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}


contract AutoETHSavingsAccount is Ownable, ReentrancyGuard{
    using SafeMath for uint;
    
    // state variables
    address payable private savingsAccount;
    uint public balance;

    constructor () public {
    }
    
    // this function lets you add and replace the old SavingsAccount in which the marginal savings will be deposited
    function addSavingsAccounts (address payable _address) onlyOwner public {
        savingsAccount = _address;
    }
    
    // this function lets you deposit ETH into this wallet
    function depositETH() payable public returns (uint) {
        balance += msg.value;
    }
    // fallback function let you / anyone send ETH to this wallet without the need to call any function
    function() external payable {
        balance += msg.value;
    }
    // Through this function you will be making a normal payment to any external address or a wallet address as in the normal situation    
    function payETH(address payable _to, uint _amount, uint _pettyAmount) onlyOwner nonReentrant external returns (uint) {
        uint grossPayableAmount = SafeMath.add(_amount, _pettyAmount);
        require(balance > SafeMath.add(grossPayableAmount, 20000000000000000), "the balance held by the Contract is less than the amount required to be paid");
        balance = balance - _amount - _pettyAmount;
        savePettyCash(_pettyAmount);
        _to.transfer(_amount);
        }
    // Depositing the savings amount into the Savings Account   
    function savePettyCash(uint _pettyAmount) internal {
        savingsAccount.transfer(_pettyAmount);
    }

}
