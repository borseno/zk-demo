<template>
  <div class="complaint-form">
    <h2>Submit Anonymous Complaint</h2>
    <form @submit.prevent="submitComplaint">
      <div>
        <label for="identitySecret">Identity Secret:</label>
        <input type="text" v-model="identitySecret" required />
      </div>
      <div>
        <label for="complaint">Complaint:</label>
        <textarea v-model="complaint" required></textarea>
      </div>
      <button type="submit">Submit Complaint</button>
    </form>
    <div v-if="submissionStatus">
      <p>{{ submissionStatus }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ComplaintForm',
  setup() {
    const identitySecret = ref('');
    const complaint = ref('');
    const submissionStatus = ref('');

    const submitComplaint = async () => {
      try {
        // Call the proof generation and contract submission logic here
        // For example, you might call a method from ProofGenerator component
        submissionStatus.value = 'Complaint submitted successfully!';
      } catch (error) {
        submissionStatus.value = 'Error submitting complaint: ' + error.message;
      }
    };

    return {
      identitySecret,
      complaint,
      submissionStatus,
      submitComplaint,
    };
  },
});
</script>

<style scoped>
.complaint-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.complaint-form h2 {
  text-align: center;
}

.complaint-form div {
  margin-bottom: 15px;
}

.complaint-form label {
  display: block;
  margin-bottom: 5px;
}

.complaint-form input,
.complaint-form textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.complaint-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.complaint-form button:hover {
  background-color: #0056b3;
}
</style>