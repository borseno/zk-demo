import { MerkleTree } from 'merkletreejs';
import { keccak256 } from 'ethers/lib/utils';
import fs from 'fs';

const whitelist = [
    // Add the identities (hashed) of the DAO members here
    // Example: keccak256('identity1'),
    // Example: keccak256('identity2'),
];

const leaves = whitelist.map(identity => keccak256(identity));
const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
const merkleRoot = merkleTree.getRoot().toString('hex');

fs.writeFileSync('merkleRoot.txt', merkleRoot);
console.log(`Merkle Root: ${merkleRoot}`);

// Optionally, you can generate and save Merkle proofs for each identity
whitelist.forEach(identity => {
    const proof = merkleTree.getProof(keccak256(identity)).map(x => x.data.toString('hex'));
    fs.writeFileSync(`proofs/${identity}.json`, JSON.stringify(proof));
    console.log(`Proof for ${identity}:`, proof);
});