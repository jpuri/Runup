// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract RunupToken {

  string public constant name = 'Runup Token';
  string public constant symbol = 'RUP';
  uint8 public constant decimals = 18;
  uint _totalSupply;

  mapping (address => uint256) balances;

  mapping (address => mapping (address => uint256)) allowance;

  event Transfer(address indexed from, address indexed to, uint tokens);
  event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
  
  constructor(uint amount) public {
    _totalSupply = amount;
    balances[msg.sender] = amount;
  }

  function totalSupply() public view returns (uint) {
    return _totalSupply;
  }

  function balanceOf(address tokenOwner) public view returns (uint256 balance) {
    return balances[tokenOwner];
  }

  function transfer(address to, uint tokens) public returns (bool success) {
    require(balances[msg.sender] > tokens, "ERROR: transfer amount exceeds balance.");
    balances[msg.sender] = balances[msg.sender] - tokens;
    balances[to] = balances[to] + tokens;
    emit Transfer(msg.sender, to, tokens);
    return true;
  }

  function transferFrom(address from, address to, uint tokens) public returns (bool success) {
    require(allowance[from][msg.sender] > tokens, "ERROR: transfer amount exceeds allowance.");
    balances[from] = balances[from] - tokens;
    allowance[from][msg.sender] = allowance[from][msg.sender] - tokens;
    balances[to] = balances[to] + tokens;
    emit Transfer(from, to, tokens);
    return true;
  }

  function approve(address spender, uint tokens) public returns (bool success) {
    allowance[msg.sender][spender] = tokens;
    emit Approval(msg.sender, spender, tokens);
    return true;
  }
}
