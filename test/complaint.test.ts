import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { generateProof } from "../scripts/generateProof";

describe("AnonymousComplaint Contract", function () {
    let complaintContract: any;
    let merkleRoot: string;
    let identitySecret: string;
    let nullifier: string;

    before(async function () {
        const AnonymousComplaint = await ethers.getContractFactory("AnonymousComplaint");
        complaintContract = await AnonymousComplaint.deploy();
        await complaintContract.deployed();

        // Setup Merkle root and identity secret for testing
        merkleRoot = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"; // Example Merkle root
        identitySecret = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef"; // Example identity secret
        nullifier = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["bytes32", "bytes32"], [identitySecret, "fixed_salt"]));
    });

    it("should allow a valid complaint submission", async function () {
        const { proof, publicSignals } = await generateProof(identitySecret, merkleRoot);

        const tx = await complaintContract.submitComplaint(publicSignals[1], proof);
        await tx.wait();

        const eventFilter = complaintContract.filters.ComplaintSubmitted(nullifier);
        const events = await complaintContract.queryFilter(eventFilter);
        expect(events.length).to.equal(1);
    });

    it("should reject duplicate complaint submissions", async function () {
        const { proof, publicSignals } = await generateProof(identitySecret, merkleRoot);

        await complaintContract.submitComplaint(publicSignals[1], proof);

        await expect(complaintContract.submitComplaint(publicSignals[1], proof)).to.be.revertedWith("Duplicate complaint submission");
    });

    it("should reject invalid complaints", async function () {
        const invalidProof = "0x0000000000000000000000000000000000000000000000000000000000000000"; // Invalid proof

        await expect(complaintContract.submitComplaint(nullifier, invalidProof)).to.be.revertedWith("Invalid proof");
    });
});