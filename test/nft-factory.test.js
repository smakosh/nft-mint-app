const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
	it("Should create NFT item/token", async function () {
		// init raandom metadata
		const metadata =
			"https://opensea-creatures-api.herokuapp.com/api/creature/1";
		// get the factory contract
		const ContractFactory = await ethers.getContractFactory("NFTFactory");
		// deploy the contract
		const contractFactory = await ContractFactory.deploy();
		// mint the token
		const transaction = await contractFactory.createToken(metadata);
		// wait the token to be minted
		const txn = await transaction.wait();
		// get the token ID
		const event = txn.events[0];
		const value = event.args[2];
		const tokenId = value.toNumber();
		// using the tokenURI from ERC721 to retrieve de metadata
		const tokenURI = await contractFactory.tokenURI(tokenId);
		// compaare & test
		expect(tokenURI).to.be.equal(metadata);
	});
});
