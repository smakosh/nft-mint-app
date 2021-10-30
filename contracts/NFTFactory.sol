// SPDX-License-Identifier: MIT OR Apache-2.0
// Jefferyhus Contracts v0.0.1-alpha (./NFT.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC2309.sol";
import "./extensions/ERC2309URIStorage.sol";

import "hardhat/console.sol";

contract NFTFactory is ERC2309URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(string memory name, string memory symbol)
        ERC2309(name, symbol)
    {}

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}
