# ethereum-solidity-exercises
Exercises with Truffle Suite

La suite comprende tre componenti principali:
- Truffle: un framework per sviluppare smart contract;
- Ganache: una blockchain di sviluppo per eseguire e testare smart contract
localmente;
- Drizzle: un set di librerie frontend per semplificare lo sviluppo di dApp;

### General Commands
_npx truffle create contract NameContract_ (crea contratto dove possiamo creare funzioni riferite al contratto - template)

dopo aver scritto contratto eseguo la migrazione:
_npx truffle create migration NameContract_

scrivere file migrazione:
_const NameContract = artifacts.require('NameContract')
module.exports = function (deployer) {
  deployer.deploy(NameContract)
};_

crezione test:
_npx truffle create test NameContract_
