// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/Script.sol";
import "../src/gameNFT.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        GameNFT nft = new gameNFT();
        
        vm.stopBroadcast();
    }
}
