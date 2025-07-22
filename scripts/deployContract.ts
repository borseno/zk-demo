import { ethers } from "hardhat";

async function main() {
    const AnonymousComplaint = await ethers.getContractFactory("AnonymousComplaint");
    const anonymousComplaint = await AnonymousComplaint.deploy();

    await anonymousComplaint.deployed();

    console.log("AnonymousComplaint deployed to:", anonymousComplaint.address);
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });