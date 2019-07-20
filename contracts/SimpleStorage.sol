pragma solidity ^0.5.0;

contract SimpleStorage {
  string storedData;

  function set(string memory _name) payable public {
    storedData = _name;
  }

  function get() public view returns (string memory) {
    return storedData;
  }
}
