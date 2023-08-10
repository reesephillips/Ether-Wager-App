const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bets", function () {
  let bets;
  let owner;
  let addr1;
  let addr2;

  before(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    bets = await ethers.deployContract("Bets");

  });

  it("Users should be allowed to bet", async function () {
    await bets.connect(owner).setBettingLive();

    const betAmount1 = ethers.parseEther(String(2))
    const betAmount2 = ethers.parseEther(String(5))
    const betAmount3 = ethers.parseEther(String(7))


    await bets.connect(addr1).bet(1, 1, {
      value: betAmount1
    })

    await bets.connect(addr2).bet(2, 1, {
      value: betAmount2
    })

    await bets.connect(addr3).bet(2, 6, {
      value: betAmount3
    })

    expect(await bets.betAggregator(1)).to.equal(1);

    await bets.connect(owner).setBettingLive();
    await bets.connect(owner).selectWinner(1)

    const initialWinner = await bets.winner();

    expect(initialWinner).to.equal(1)

    await bets.connect(addr1).claimWinnings();

  })


  it("Only owner can set contract live", async function () {
    try {
      await bets.connect(addr2).setBettingLive();
      // If the transaction does not revert, the test should fail
      expect.fail("Transaction did not revert.");
    } catch (error) {
      // Check the error message here
      expect(error.message).to.include("Ownable: caller is not the owner");
    }
  });

});
