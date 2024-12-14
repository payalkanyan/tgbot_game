// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {RewardNFT} from "../src/RewardNFT.sol";
import "forge-std/console.sol";

contract DeployRewardNFT is Script {
    function run() external {
        vm.startBroadcast();

        // Pass the constructor argument (e.g., owner address)
        address owner = msg.sender; // Replace with a specific address if needed
        RewardNFT rewardNFT = new RewardNFT(owner);

        console.log("RewardNFT deployed at:", address(rewardNFT));

        vm.stopBroadcast();
    }
}
