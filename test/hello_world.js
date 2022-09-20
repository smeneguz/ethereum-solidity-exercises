const HelloWorld = artifacts.require("HelloWorld");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("HelloWorld", function (/* accounts */) {
  it("should return the 'Hello, World'", async function () {
    const instance = await HelloWorld.deployed();
    const message = await instance.hello()
    return assert.equal(message, 'Hello, World!');
  });
});
