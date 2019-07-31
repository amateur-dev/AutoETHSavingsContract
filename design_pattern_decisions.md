## Access Restriction
Access modifiers to limit access to functions


## Circuit Breaker
The circuit breaker pattern allows the contract owner (or in this case anyone with Admin privelages) the ablility to stop certain functions in case there is an unexpected bug that is found.

## Auto-Deprecation

Included the mortal design pattern to allow the owner of the contract to self destruct if the need arises
```
function kill() private isAdmin{
    if (msg.sender == owner) selfdestruct(msg.sender);
  }
```