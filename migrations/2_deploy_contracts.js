var RunupToken = artifacts.require("./RunupToken.sol");

module.exports = function (deployer) {
  deployer.deploy(RunupToken, 1000);
};
