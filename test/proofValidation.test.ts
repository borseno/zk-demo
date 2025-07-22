import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { SnarkProof, verifyProof } from "snarkjs";

describe("Proof Validation", function () {
    let contract: any;

    before(async () => {
        const AnonymousComplaint = await ethers.getContractFactory("AnonymousComplaint");
        contract = await AnonymousComplaint.deploy();
        await contract.deployed();
    });

    it("should verify a valid proof", async function () {
        const merkleRoot = "0x..."; // Replace with actual merkle root
        const nullifier = "0x..."; // Replace with actual nullifier
        const proof: SnarkProof = {
            pi_a: ["0x...", "0x..."], // Replace with actual proof values
            pi_b: [["0x...", "0x..."], ["0x...", "0x..."]],
            pi_c: ["0x...", "0x..."],
            inputs: [merkleRoot, nullifier]
        };

        const isValid = await contract.verifyProof(proof);
        expect(isValid).to.be.true;
    });

    it("should reject an invalid proof", async function () {
        const invalidProof: SnarkProof = {
            pi_a: ["0x...", "0x..."], // Replace with invalid proof values
            pi_b: [["0x...", "0x..."], ["0x...", "0x..."]],
            pi_c: ["0x...", "0x..."],
            inputs: ["0x...", "0x..."] // Invalid inputs
        };

        const isValid = await contract.verifyProof(invalidProof);
        expect(isValid).to.be.false;
    });
});