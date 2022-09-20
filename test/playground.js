const Playground = artifacts.require("Playground");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Playground", function (accounts) {
  it("should return the sum", async function () {
    const instance = await Playground.deployed();
    const result = await instance.sum(7, 7);
    return assert.equal(result, 14);
  });
  it("receives money test", async function(){
    const instance = await Playground.deployed();
    await instance.getMoney({from: accounts[2], value: web3.utils.toWei("5", "ether")});
    const balance = await web3.eth.getBalance(instance.address);
    return assert.equal(balance, web3.utils.toWei("5", "ether"));
  })
  it('send money test', async function() {
    const instance = await Playground.deployed();
    const balance_before = await web3.eth.getBalance(accounts[1]);
    await instance.sendMoney(accounts[1], {from: accounts[2]});
    const balance_after = await web3.eth.getBalance(accounts[1]);
    return assert.isAbove(+balance_after, +balance_before);
  });

  it("save message and get message", async function() {
    const instance = await Playground.deployed();
    await instance.saveMessage("test");
    const message = await instance.getMessage();
    return assert.equal(message, "test");
  })

  it("test greet", async function() {
    const instance = await Playground.deployed();
    const message = await instance.greet("test");
    return assert.equal(message, "Hello test");
  })

  it("test compareStrings", async function() {
    const instance = await Playground.deployed();
    const result = await instance.compareStrings("test", "test");
    return assert.isTrue(result);
  })

  it("test getFirstLetterAndLength", async function() {
    const instance = await Playground.deployed();
    const result = await instance.getFirstLetterAndLength("test");

    return assert.equal(result.a, 4) && assert.equal(string.fromCharCode(result.b), "t");
  })

  it("test cars", async function() {
    const instance = await Playground.deployed();
    const buyer = accounts[2];
    await instance.buyCar(buyer, "modelX", "2007", {from : buyer, value : web3.utils.toWei("0.1", "ether")})
    const result = await instance.getCarForAddress(buyer)
    return assert.isTrue(result.success);
  })

  it("test cars 2, amount ether ", async function() {
    const instance = await Playground.deployed();
    const buyer = accounts[2];
    try{
      await instance.buyCar(buyer, "modelX", "2007", {from : buyer, value : web3.utils.toWei("0.001", "ether")})
      assert.fail("should have thrown")
    } catch(error) {
      expect(error.message.includes("Invalid transaction amount"))
    }
  })

  it("test cars 2, car already exist", async function() {
    const instance = await Playground.deployed();
    const buyer = accounts[2];
    try{
      await instance.buyCar(buyer, "OK", "2007", {from : buyer, value : web3.utils.toWei("0.1", "ether"),})
      assert.fail("should have thrown")

      await instance.buyCar(buyer, "OK", "2007", {from : buyer, value : web3.utils.toWei("0.1", "ether"),})
      assert.fail("should have thrown")
    } catch(error) {
      expect(error.message.includes("Car already exist"))
    }
  })
  it("test cars, test CarPurchased ", async function() {
    const instance = await Playground.deployed();
    const buyer = accounts[6];
    const result = await instance.buyCar(buyer, "modelX", "2007", {from : buyer, value : web3.utils.toWei("0.1", "ether")})
    const event = result.logs.find((l) => l.event === "CarPurchased")
    expect(typeof event !== "undefined")
    expect(result.logs[0].args.car.model == "modelX")
  })

  it("owner ", async function() {
    const instance = await Playground.deployed();
    const buyer = accounts[6];
    try {
      await instance.withdraw({ from : accounts[3]})
      assert.fail("should thro")
    } catch (error){
      expect(error.messa)
    }

    const ownerBalance = await web3.eth.getBalance(accounts[0])
    await instance.withdraw()
    const ownerBalanceAfter = await web3.eth.getBalance(accounts[0])

    expect(Number(OwnerBalace))

  })
  
});

//per comparare due stringhe
//bool match = keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));

//vedere log result
// console.log(result)
// assert.equal(true, true)