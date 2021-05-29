import React, { Component } from "react";
import RunupTokenContract from "./contracts/RunupToken.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RunupTokenContract.networks[networkId];
      const instance = new web3.eth.Contract(
        RunupTokenContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      this.setState({ web3, accounts, contract: instance });
      console.log(
        await web3.eth.getBalance("0x7F23b976b2629a7FBe05870feaf60CA8b7Db7D1C")
      );
      console.log(
        await web3.eth.getBalance("0x3EF6E2A3B4859cBC262f55e69989ee74f7BAFa10")
      );
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>Accounts are: {JSON.stringify(this.state.accounts)}</div>
      </div>
    );
  }
}

export default App;
