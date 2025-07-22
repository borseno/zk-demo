import { snarkjs } from "snarkjs";
import * as fs from "fs";
import * as path from "path";

async function generateProof() {
    const circuitPath = path.join(__dirname, "../circuits/complaint.circom");
    const inputPath = path.join(__dirname, "../input.json");
    const outputPath = path.join(__dirname, "../proof.json");

    // Compile the circuit
    const { circuit, provingKey, verificationKey } = await snarkjs.circom.compile(circuitPath);

    // Load input data
    const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));

    // Generate the proof
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, circuit, provingKey);

    // Save the proof and public signals
    fs.writeFileSync(outputPath, JSON.stringify({ proof, publicSignals }, null, 2));

    console.log("Proof generated successfully!");
    console.log("Public Signals:", publicSignals);
}

generateProof().catch((error) => {
    console.error("Error generating proof:", error);
});