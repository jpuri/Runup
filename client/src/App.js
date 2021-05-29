import React, { Component } from "react";
import RunupTokenContract from "./contracts/RunupToken.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    web3: null,
    accounts: [],
    balances: [],
    contract: null,
    address: null,
    transferAmount: 0,
  };

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
      await instance.methods.balanceOf(accounts[0]).send({ from: accounts[0] });
      const balance = await instance.methods.balanceOf(accounts[0]).call();

      this.setState({
        web3,
        accounts,
        balances: [balance],
        contract: instance,
      });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  setAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  setTransferAmount = (event) => {
    this.setState({ transferAmount: event.target.value });
  };

  transfer = async () => {
    const { accounts, contract, address, balances, transferAmount } =
      this.state;

    if (transferAmount <= 0) return;
    await contract.methods
      .transfer(address, transferAmount)
      .send({ from: accounts[0] });
    await contract.methods.transfer(address, transferAmount).call();
    const [owner, rest = []] = balances;

    await contract.methods.balanceOf(address).send({ from: accounts[0] });
    const balance = await contract.methods.balanceOf(address).call();

    this.setState({
      accounts: [...accounts, address],
      balances: [owner - transferAmount, ...rest, balance],
    });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const { accounts, balances } = this.state;
    return (
      <div className="App">
        <h3>Runup Token Balances</h3>
        <table style={{ border: "1px solid lightgray", marginTop: 75 }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Account</th>
              <th>Runup Balance</th>
            </tr>
            {accounts.map((account, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{account}</td>
                <td>{balances[index]}</td>
              </tr>
            ))}
          </thead>
        </table>
        <h3 style={{ marginTop: 75 }}>Transfer Runup Tokens</h3>
        <div>
          Address: <input onChange={(event) => this.setAddress(event)} />
        </div>
        <div>
          Number of tokens:{" "}
          <input onChange={(event) => this.setTransferAmount(event)} />
        </div>
        <button type="button" onClick={() => this.transfer()}>
          Transfer
        </button>
      </div>
    );
  }
}

export default App;
