// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Bets is Ownable {

    uint256 public winningsPerBet;
    uint256 public winner;
    
    uint256 public constant BETTING_FEE = 5 ether;
    uint256 public constant PLAYER_POOL = 4;

    mapping(address => mapping(uint256 => uint256)) public userBets;
    mapping(uint256 => uint256) public betAggregator;
    mapping(address => bool) public claimedStatus;

    bool public bettingLive;
    bool public winnerChosen;

    function bet(uint256 player, uint256 betNum) external payable {
        require(bettingLive, "No more bets");
        require(player < PLAYER_POOL, "You must bet on a valid player");
        unchecked {
            userBets[msg.sender][player] += betNum;
            betAggregator[player] += betNum;
        }
    }

    function setBettingLive() external onlyOwner {
        bettingLive = !bettingLive;
    }

    function selectWinner(uint256 _winner) external onlyOwner {
        require(_winner <= PLAYER_POOL && _winner > 0, "Must pick a valid winner");
        require(bettingLive == false, "Cannot choose a winner until after betting is closed");
        winnerChosen = true;
        winner = _winner;
        winningsPerBet = address(this).balance / betAggregator[winner];
    }

    function claimWinnings() external {
        uint256 userWinnings = userBets[msg.sender][winner] * winningsPerBet;
        require(winnerChosen == true, "You cannot claim your reward until a winner has been chosen");
        require(userWinnings > 0, "You do not have any winnings to claim");
        require(claimedStatus[msg.sender] == false, "You have already claimed your winnings");
        claimedStatus[msg.sender] = true;
        payable(msg.sender).transfer(userWinnings);
    }

    function withdraw() external onlyOwner {
        require(winnerChosen == true, "Cannot withdraw until after a winner has been chosen");
        payable(msg.sender).transfer(address(this).balance);
    }

    function resetContract() external onlyOwner {
        for (uint256 i = 1; i < PLAYER_POOL; i++) {
            betAggregator[i] = 0;
        }
        winnerChosen = false;
        bettingLive = false;
        winningsPerBet = 0;
        winner = 0;
    }
}
