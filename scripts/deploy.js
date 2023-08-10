
const hre = require("hardhat");

async function main() {
  const betContractFactory = await hre.ethers.deployContract('Bets');

  await betContractFactory.waitForDeployment();

  console.log("Contract deployed to: ", betContractFactory.target)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
