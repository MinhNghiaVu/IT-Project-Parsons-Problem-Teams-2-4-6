<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
  // Handle login logic here
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>

<template>
  <div class="login">
    <div class="header">
      <img src="/logo.png" alt="Logo" class="logo1" />
      <div class="company-name">learnr</div>
    </div>
    <div class="login-frame">
      <div class="main-content">
        <img src="/logo.png" alt="Logo" class="logo2" />
        <div class="title">Admin Login</div>
        <div class="login-form">
          <input
            v-model="email"
            type="text"
            class="login-input"
            placeholder="Enter your Username"
          />
          <input
            v-model="password"
            type="password"
            class="login-input"
            placeholder="Enter your Password"
          />
          <button @click="handleLogin" class="login-button">Login</button>
        </div>
        <div class="warning-container">
          <div class="warning1">Not Admin?</div>
          <div class="warning2">Go Back to Home</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-frame {
  box-sizing: border-box;
  margin-top: 3%;
  margin-left: 33%;
  padding-top: 30px;
  width: 550px;
  height: 650px;
  background: #F6F4F4;
  border-radius: 30px;
  display: flex;
  align-items: center; /* Center all items horizontally */
}
.title {
  font-size: 30px;
  font-weight: bold;
}

.login {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: #156B3A;; /* Matching background color */
}

.header {
  display: flex;
  align-items: center;
  padding: 15px;
  /* background#F6F4F4; 
  border-bottom: 1px solid #ddd; */
}

.logo1 {
  height: 30px; /* Adjust as needed */
  margin-right: 10px;
}

.logo2 {
  height: 50px; /* Adjust as needed */
  margin-right: 10px;
}

.company-name {
  font-size: 24px;
  font-weight: bold;
}
.warning-container {
  display: flex; /* Align items in a row */
  justify-content: space-between; /* Distribute space between the warnings */
  position: absolute; /* Position relative to parent */
  bottom: 115px; /* Adjust as needed for spacing from the bottom */
  width: 9.5%; /* Full width of the parent container */
  padding: 20px; /* Optional padding for spacing from edges */
}
.warning1 {
  font-size: 10px;
}
.warning2 {
  font-size: 10px;
  font-weight: bold;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
  font-size: 24px;
  font-family: Lexend, sans-serif;
  font-weight: 500;
  line-height: 48px;
  word-wrap: break-word;
  margin-bottom: 80px;
  gap: 30px; /* Space between all children */
}

.login-form {
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px; /* Space between all children */
}

.login-input {
  width: 80%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 3px;
  border: 1px solid #ccc;
  outline: none;
}

.login-button {
  background-color: #030403;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  width: 55%;
  font-size: 13px;
}
</style>