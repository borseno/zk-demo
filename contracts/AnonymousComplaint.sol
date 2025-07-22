pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract AnonymousComplaint is Ownable {
    bytes32 public merkleRoot;
    mapping(bytes32 => bool) public usedNullifiers;

    event ComplaintSubmitted(bytes32 nullifier);

    constructor(bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }

    function submitComplaint(
        bytes32 nullifier,
        bytes32 identitySecretHash,
        bytes32[] calldata proof
    ) external {
        require(!usedNullifiers[nullifier], "Nullifier already used");
        require(verifyMerkleProof(identitySecretHash, proof), "Invalid Merkle proof");

        usedNullifiers[nullifier] = true;
        emit ComplaintSubmitted(nullifier);
    }

    function verifyMerkleProof(bytes32 identitySecretHash, bytes32[] calldata proof) internal view returns (bool) {
        return MerkleProof.verify(proof, merkleRoot, identitySecretHash);
    }

    function updateMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }
}