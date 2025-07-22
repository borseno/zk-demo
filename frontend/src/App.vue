<template>
  <div id="app">
    <h1>Anonymous Complaint Submission</h1>
    <ComplaintForm @submit="handleComplaintSubmission" />
    <ProofGenerator v-if="proofGenerated" :proof="proof" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ComplaintForm from './components/ComplaintForm.vue';
import ProofGenerator from './components/ProofGenerator.vue';

export default defineComponent({
  name: 'App',
  components: {
    ComplaintForm,
    ProofGenerator,
  },
  setup() {
    const proofGenerated = ref(false);
    const proof = ref(null);

    const handleComplaintSubmission = (generatedProof: any) => {
      proof.value = generatedProof;
      proofGenerated.value = true;
    };

    return {
      proofGenerated,
      proof,
      handleComplaintSubmission,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>