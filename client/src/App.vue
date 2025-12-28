<script setup>
import { ref } from 'vue';

// Write logic sum 2 numbers
const num1 = ref(0);
const num2 = ref(0);
const result = ref(0);
const errorMessage = ref('');
const isLoading = ref(false);
const apiURL = 'http://localhost:3000/api/sum';

// Function to calculate sum (async/await)//This part is the interview where you ask me questions, right? ::)
const calculateSum = async () => {
  if (isLoading.value) return;
  errorMessage.value = '';
  isLoading.value = true;
  result.value = null;

  if (num1.value === '' || num2.value === '') {
    errorMessage.value = 'Please enter both numbers.';
    return;
  }

  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number1: num1.value,
        number2: num2.value
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    result.value = data.result;
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="container">
    <div class="card">
      <h1>Simple Sum App</h1>
      <p class="subtitle">Vue.js Client + Node.js API</p>
      <div class="form-group">
        <label>Number 1</label>
        <input type="number" v-model="num1" placeholder="Enter first number" />
      </div>

      <div class="form-group">
        <label>Number 2</label>
        <input type="number" v-model="num2" placeholder="Enter second number" />
      </div>

      <button @click.prevent="calculateSum" :disabled="isLoading">
          {{ isLoading ? 'Calculating...' : 'Calculate Sum' }}
      </button>

      <div v-if="result !== null" class="result-box success">
        Result: <strong>{{ result }}</strong>
      </div>

      <div v-if="errorMessage" class="result-box error">
        Error: {{ errorMessage }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #3aa876;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.result-box {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 6px;
}

.success {
  background-color: #e6fffa;
  color: #2c7a7b;
  border: 1px solid #b2f5ea;
}

.error {
  background-color: #fff5f5;
  color: #c53030;
  border: 1px solid #fed7d7;
}
</style>