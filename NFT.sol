// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RewardNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    address private owner;

    constructor() ERC721("RewardNFT", "RNFT") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can mint NFTs");
        _;
    }

    function claimNFT(address to, string memory tokenURI) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _tokenIdCounter.increment();
        return tokenId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
