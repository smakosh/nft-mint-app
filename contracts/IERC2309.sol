// SPDX-License-Identifier: MIT
// Jefferyhus Contracts v0.0.1-alpha (./IERC2309.sol)

pragma solidity ^0.8.0;

/**
 * @dev Required interface for https://eips.ethereum.org/EIPS/eip-2309[ERC2309], A standardized event emitted
 *  when creating/transferring one, or many non-fungible tokens using consecutive token identifiers.
 */
contract IERC2309 {
    /**
     * @dev eip-2309 event to use during minting.  Enables us to have constant gas fees.
     * @notice This event is emitted when ownership of a batch of tokens changes by any mechanism.
     * This includes minting, transferring, and burning.
     *
     * @dev The address executing the transaction MUST own all the tokens within the range of
     * fromTokenId and toTokenId, or MUST be an approved operator to act on the owners behalf.
     * The fromTokenId and toTokenId MUST be a sequential range of tokens IDs.
     * When minting/creating tokens, the `fromAddress` argument MUST be set to `0x0` (i.e. zero address).
     * When burning/destroying tokens, the `toAddress` argument MUST be set to `0x0` (i.e. zero address).
     *
     * @param fromTokenId The token ID that begins the batch of tokens being transferred
     * @param toTokenId The token ID that ends the batch of tokens being transferred
     * @param fromAddress The address transferring ownership of the specified range of tokens
     * @param toAddress The address receiving ownership of the specified range of tokens.
     */
    event ConsecutiveTransfer(
        uint256 indexed fromTokenId,
        uint256 toTokenId,
        address indexed fromAddress,
        address indexed toAddress
    );
}
