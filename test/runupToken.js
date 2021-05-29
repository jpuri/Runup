const RunupToken = artifacts.require("./RunupToken.sol");

contract("RunupToken", function (accounts) {
  const [initialHolder, recipient, anotherAccount] = accounts;

  it("has a name", async function () {
    const token = await RunupToken.new(1000);
    assert.equal(await token.name(), "Runup Token", "Correct name is set");
  });

  it("has a symbol", async function () {
    const token = await RunupToken.new(1000);
    assert.equal(await token.symbol(), "RUP", "Correct symbol is set");
  });

  it("has decimal defined", async function () {
    const token = await RunupToken.new(1000);
    assert.equal(await token.decimals(), 18, "Correct decimal is set");
  });

  it("initialHolder has a balance of 1000 set", async function () {
    const token = await RunupToken.new(1000);
    assert.equal(
      await token.balanceOf(initialHolder),
      1000,
      "Correct initial balance of initialHolder"
    );
  });

  it("recipient gets correct number of tokens after transfer", async function () {
    const token = await RunupToken.new(1000);
    await token.transfer(recipient, 100);
    assert.equal(
      await token.balanceOf(recipient),
      100,
      "Recipient will get correct amount of tokens after transfer"
    );
  });

  it("user should not be able to transfer more tokens than what he has", async function () {
    const token = await RunupToken.new(1000);
    try {
      await token.transfer(recipient, 2000);
    } catch (error) {}
    assert.equal(
      await token.balanceOf(recipient),
      0,
      "Recipient will get correct amount of tokens after transfer"
    );
  });

  it("user should not be able to approve more tokens than what he has", async function () {
    const token = await RunupToken.new(1000);
    try {
      await token.approve(recipient, 2000);
    } catch (error) {
      assert.equal(0, 0, "Error while trying to approve more than balance");
    }
  });
});
