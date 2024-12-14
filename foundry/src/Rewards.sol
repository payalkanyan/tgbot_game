// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Rewards {
    address public owner;
    uint256 public rewardPerPoint = 1 ether; // 1 Token per score point

    mapping(address => uint256) public scores;
    mapping(address => bool) public hasClaimed;

    event RewardMinted(address indexed player, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Update score (only callable by the backend)
    function updateScore(address player, uint256 score) external onlyOwner {
        scores[player] = score;
    }

    // Claim rewards based on score
    function claimReward() external {
        require(scores[msg.sender] > 0, "No score to claim reward");
        require(!hasClaimed[msg.sender], "Already claimed");

        uint256 reward = scores[msg.sender] * rewardPerPoint;
        hasClaimed[msg.sender] = true;

        // Mint reward (this would require an ERC20 token contract)
        payable(msg.sender).transfer(reward);
        emit RewardMinted(msg.sender, reward);
    }

    // Update reward rate (only callable by owner)
    function setRewardRate(uint256 rate) external onlyOwner {
        rewardPerPoint = rate;
    }
}
