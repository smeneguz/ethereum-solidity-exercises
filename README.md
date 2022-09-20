# ethereum-solidity-exercises
Exercises with Truffle Suite

La suite comprende tre componenti principali:
- Truffle: un framework per sviluppare smart contract;
- Ganache: una blockchain di sviluppo per eseguire e testare smart contract
localmente;
- Drizzle: un set di librerie frontend per semplificare lo sviluppo di dApp;

### General Commands
npx truffle create contract NameContract
(crea contratto dove possiamo creare funzioni riferite al contratto - template)

dopo aver scritto contratto eseguo la migrazione
npx truffle create migration NameContract

scrivere file migrazione:
const NameContract = artifacts.require('NameContract')
module.exports = function (deployer) {
  deployer.deploy(NameContract)
};

crezione test:
npx truffle create test NameContract

