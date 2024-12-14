// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter; // Tracks token IDs
    mapping(address => bool) public hasClaimed; // Tracks claimed NFTs

    event NFTClaimed(address indexed claimer, uint256 tokenId, string tokenURI);

    constructor() ERC721("RewardNFT", "RNFT") {
        tokenCounter = 0; // Initialize token counter
    }

    /**
     * @dev Claim an NFT.
     * @param tokenURI The metadata URI for the NFT.
     */
    function claimNFT(string memory tokenURI) external {
        require(!hasClaimed[msg.sender], "You have already claimed an NFT.");

        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        hasClaimed[msg.sender] = true;
        tokenCounter++;

        emit NFTClaimed(msg.sender, newTokenId, tokenURI);
    }

    /**
     * @dev Allows the owner to mint NFTs directly.
     * @param recipient The recipient address.
     * @param tokenURI The metadata URI for the NFT.
     */
    function mintNFT(address recipient, string memory tokenURI) external onlyOwner {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        tokenCounter++;
    }
}