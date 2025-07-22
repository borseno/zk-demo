<template>
  <div>
    <h2>Proof Generator</h2>
    <form @submit.prevent="generateProof">
      <div>
        <label for="identitySecret">Identity Secret:</label>
        <input type="text" v-model="identitySecret" required />
      </div>
      <div>
        <label for="merkleProof">Merkle Proof:</label>
        <textarea v-model="merkleProof" required></textarea>
      </div>
      <button type="submit">Generate Proof</button>
    </form>
    <div v-if="proof">
      <h3>Generated Proof</h3>
      <pre>{{ proof }}</pre>
      <button @click="submitProof">Submit Proof</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { generateProof } from '@/scripts/generateProof'; // Adjust the import path as necessary
import { submitProofToContract } from '@/scripts/submitProof'; // Adjust the import path as necessary

export default defineComponent({
  setup() {
    const identitySecret = ref('');
    const merkleProof = ref('');
    const proof = ref<string | null>(null);

    const generateProof = async () => {
      try {
        proof.value = await generateProof(identitySecret.value, merkleProof.value);
      } catch (error) {
        console.error('Error generating proof:', error);
      }
    };

    const submitProof = async () => {
      if (proof.value) {
        try {
          await submitProofToContract(proof.value);
          alert('Proof submitted successfully!');
        } catch (error) {
          console.error('Error submitting proof:', error);
        }
      }
    };

    return {
      identitySecret,
      merkleProof,
      proof,
      generateProof,
      submitProof,
    };
  },
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>