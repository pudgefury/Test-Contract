require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "mumbai",
  etherscan: {
    apiKey: {
      // polygon
      bscTestnet: process.env.BSCSCAN_API_KEY,
      polygon: process.env.MATIC_API_KEY,
      polygonMumbai: process.env.MATIC_API_KEY,
      rinkeby: process.env.ETHSCAN_API_KEY,
    }
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9df091cbf0cb4fa189fc3fe978bad494",
      accounts: [process.env.PRIVATE_KEY],
    },
    matic: {
      url : "https://rpc-mainnet.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [process.env.PRIVATE_KEY],
    },
    ganache: {
      url: 'http://localhost:7545',
      accounts: [process.env.PRIVATE_KEY]
    },
    local: {
      url: 'http://localhost:8545',
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
