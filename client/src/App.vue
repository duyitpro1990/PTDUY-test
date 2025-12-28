<script setup>
import { ref } from 'vue';

// Write logic sum 2 numbers
const num1 = ref(0);
const num2 = ref(0);
const sum = ref(0);
const errorMessage = ref('');
const isLoading = ref(false);
const apiURL = 'http://localhost:3000/api/sum';

// Function to calculate sum (async/await)//This part is the interview where you ask me questions, right? ::)
const calculateSum = async () => {
  errorMessage.value = '';
  isLoading.value = true;
  sum.value = 0;

    try {
        const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            number1: Number(num1.value),
            number2: Number(num2.value)
        }),
        });
    
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        sum.value = data.sum;
    } catch (error) {
        errorMessage.value = 'Error calculating sum: ' + error.message;
    } finally {
        isLoading.value = false;
    }
};
</script>
<template>
  <div class="app-container">
    <h1>Sum Two Numbers</h1>
    <div class="input-group">
      <label for="num1">Number 1:</label>
      <input type="number" id="num1" v-model="num1" />
    </div>
    <div class="input-group">
      <label for="num2">Number 2:</label>
      <input type="number" id="num2" v-model="num2" />
    </div>
    <button @click="calculateSum" :disabled="isLoading">
      {{ isLoading ? 'Calculating...' : 'Calculate Sum' }}
    </button>
    <div class="result" v-if="sum !== 0">
      <h2>Result: {{ sum }}</h2>
    </div>
    <div class="error" v-if="errorMessage">
      <h2>{{ errorMessage }}</h2>
    </div>
  </div>
</template>
<style scoped>
.app-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  font-family: Arial, sans-serif;
}   
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
}
.input-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.result {
  margin-top: 20px;
  color: green;
}
.error {
  margin-top: 20px;
  color: red;
}
</style>