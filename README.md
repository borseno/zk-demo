# ZK Anonymous Complaint System

## Overview

The ZK Anonymous Complaint System is designed to allow users who are part of a DAO whitelist to submit anonymous complaints while proving their membership without revealing their identity. This project leverages Zero-Knowledge Proofs (ZKPs) to ensure that users can submit complaints securely and privately.

## Why Use Zero-Knowledge Proofs?

Zero-Knowledge Proofs are essential for this use case because they allow a user to prove their membership in a whitelist without disclosing their identity. Traditional methods, such as simple signatures, would expose user information, compromising anonymity. ZKPs enable users to demonstrate their eligibility while keeping their identity confidential.

## Key Components

### Merkle Tree

A Merkle tree is a data structure that allows for efficient and secure verification of content. In this project, it is used to manage the DAO whitelist. Each user’s identity is hashed and stored in the Merkle tree, allowing for the generation of Merkle proofs that can be used to verify membership.

### Nullifiers

To prevent users from submitting more than one complaint, a nullifier is derived from the user's identity secret and a fixed salt. The nullifier is a unique hash that ensures each user can only submit one complaint, thus preventing double usage.

### Circuit Logic

The ZK circuit, defined in `circuits/complaint.circom`, performs the following tasks:
- Proves Merkle inclusion of `hash(identitySecret)`.
- Derives a `nullifier = hash(identitySecret || fixed_salt)`.
- Outputs public signals: `merkleRoot` and `nullifier`.

## Project Structure

- **circuits/**: Contains the Circom circuit definition for ZK proof generation.
- **contracts/**: Contains the Solidity smart contract for verifying ZK proofs and managing complaints.
- **scripts/**: Includes scripts for generating proofs, deploying contracts, and setting up the Merkle tree.
- **test/**: Contains tests for validating complaint submissions and proof verification.
- **frontend/**: A simple Vue 3 + TypeScript application for users to submit complaints and generate proofs.

## Getting Started

To set up the project, follow these steps:

1. Clone the repository.
2. Install dependencies for both the backend and frontend.
3. Set up the Merkle tree using the provided script.
4. Deploy the smart contract to your desired network.
5. Use the frontend application to submit anonymous complaints.

This project serves as a practical demonstration of Zero-Knowledge Proofs and their application in maintaining user privacy while ensuring accountability in complaint submissions.

---

## Prerequisites

- **Node.js v18.x LTS** (strongly recommended)
  - Other versions may cause dependency errors.
- Yarn or npm
- Docker (for faster Circom/snarkjs setup, optional)
- [Hardhat](https://hardhat.org/)
- [Circom](https://docs.circom.io/)
- [snarkjs](https://github.com/iden3/snarkjs)
- (Optional) [Vue CLI](https://cli.vuejs.org/)
---

## 1. Install Dependencies

```bash
# Install root dependencies
yarn install
# or
npm install

# Install frontend dependencies
cd frontend
yarn install
# or
npm install
cd ..
```

---

## 2. Compile the ZK Circuit

```bash
cd circuits

# Compile the circuit
circom complaint.circom --r1cs --wasm --sym

# Generate trusted setup (Powers of Tau)
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
snarkjs powersoftau contribute pot12_0000.ptau pot12_final.ptau --name="First contribution" -v

# Generate proving and verification keys
snarkjs groth16 setup complaint.r1cs pot12_final.ptau complaint_0000.zkey
snarkjs zkey contribute complaint_0000.zkey complaint_final.zkey --name="1st Contributor" -v

# Export verification key
snarkjs zkey export verificationkey complaint_final.zkey verification_key.json

cd ..
```

---

## 3. Deploy the Smart Contract

```bash
npx hardhat compile

# Deploy to local Hardhat network
npx hardhat node
# In a new terminal:
npx hardhat run scripts/deployContract.ts --network localhost
```

---

## 4. Generate a Proof & Submit a Complaint

```bash
# Generate Merkle tree and proof (example script)
npx ts-node scripts/setupMerkleTree.ts

# Generate a ZK proof for a complaint
npx ts-node scripts/generateProof.ts

# Submit the proof to the contract (see script or use frontend)
```

---

## 5. Run Tests

```bash
npx hardhat test
```

---

## 6. Run the Frontend

```bash
cd frontend
yarn serve
# or
npm run serve
```

---

## Project Structure

- `/circuits/` — Circom circuit and trusted setup files
- `/contracts/` — Solidity smart contract
- `/scripts/` — Scripts for proof generation, deployment, and Merkle tree setup
- `/test/` — Hardhat tests
- `/frontend/` — Vue 3 + TypeScript app

---

## Notes

- **ZK is required** to prove whitelist membership and prevent double submissions without revealing identity.
- **Simple signatures** would not preserve anonymity or prevent double usage.
- See the code and comments for details on Merkle trees, nullifiers, and circuit logic.