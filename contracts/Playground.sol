// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Car {
  uint256 year;
  string model;
  bool exists;
}

contract Ownable {
  address owner;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() virtual {
    require(msg.sender == owner, "Not allowed");
    _;
  }
}

contract NamedContract {
  string contractName;

  constructor(string memory _name){
    contractName = _name;
  }
}

/*
contract Withdrawable {
  function withdraw() external virtual{
      payable(owner).transfer(address(this).balance);

  }
} */

contract Playground is Ownable, NamedContract("Test"){
  string stored;
  Car car;

  constructor() {
    owner = msg.sender;
  }

  receive() external payable {}
  //OR
  /*
  fallback() external {
    revert("NO!");
  }
  */

/*
  modifier onlyOwner() {
    require(msg.sender == owner, "Not allowed");
    _;
  } */

  mapping(address => uint256) public tokens; // definizione del token
  mapping(address => Car) public cars;

  event CarPurchased(address indexed byAddress, Car car);

  modifier doesNotOwnACar(){
    require(cars[msg.sender].exists == false, "Car already exist");
    _; // se arriva all'anderscore allora ritorna all'esecuzione della funzione applicata

    // codice che verrà eseguito al termine della funzione a cui è applicato
  }

  modifier requireEther(uint256 amount) {
    require(msg.value == 0.1 ether, "Invalid transaction amount"); // assert(msg.value == 0.1 ether) solo all'interno di contratti per test interni, no production
    _;
  }

  function withdraw() external onlyOwner {
    payable(owner).transfer(address(this).balance);
  }

  function byebye() external onlyOwner{
    selfdestruct(payable(owner));
  }

  function buyCar(address buyer, string calldata model, uint256 year) public payable doesNotOwnACar requireEther(0.1 ether) returns(Car memory){ // modificatori applicati
    // require(msg.value == 0.1 ether, "Invalid transaction amount"); // assert(msg.value == 0.1 ether) solo all'interno di contratti per test interni, no production
    // require(cars[msg.sender].exists == false, "Car already exist");
    // address buyer = msg.sender
    if(!cars[buyer].exists) {
      cars[buyer] = Car({model: model, year : year, exists : true});
    }
    emit CarPurchased(msg.sender, cars[buyer]);
    return cars[buyer];
  }

  function getCarForAddress(address addr) public view returns(Car memory _car, bool success) {
    _car = cars[addr];
    if(!_car.exists){
      revert("Car does not exist");
    }
    success = true;
  }

  function saveMessage(string calldata message) external { // use calldata anzichè memory risparmiamo gas
    stored = message;
  }

  function getMessage() external view returns (string memory) {
    return stored;
  }

  function greet(string calldata name) external pure returns (string memory) {
      return string(abi.encodePacked("Hello ", name)); //string.concat("first", "second")
  }

  function compareStrings(string calldata first, string calldata second) external pure returns (bool) {
    return keccak256(abi.encodePacked(first)) == keccak256(abi.encodePacked(second));
  }

  function getFirstLetterAndLength(string calldata s) external pure returns ( bytes1 b, uint a) {
    bytes memory stringb = abi.encodePacked(s);
    a = stringb.length;
    b = stringb[0];
  }



  function sum(uint256 a, uint256 b) public pure returns (uint256)  {
      uint256 c = a + b;
      return c;
  }

  function sendMoney(address payable to) public{
      to.transfer(5 ether);
  }

function getMoney() external payable {
}
}
