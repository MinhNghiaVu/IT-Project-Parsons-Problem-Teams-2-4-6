<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'  // Import Vue Router for navigation

const email = ref('')
const password = ref('')
const router = useRouter()  // Initialize the router

function handleLogin() {
  // Hardcoded admin credentials
  const adminUsername = 'admin'
  const adminPassword = 'admin123'

  // Check if entered email and password match the admin credentials
  if (email.value === adminUsername && password.value === adminPassword) {
    console.log('Login successful!')
    // Navigate to the AdminProfile page
    router.push('/AdminProfile')
  } else {
    console.log('Invalid login credentials.')
    alert('Invalid Username or Password')  // Display an error message
  }
}

function goToGenerator() {
  router.push('/Generator')  // Navigate to the Generator page
}
</script>


<template>
  <div class="header">
    <img src="/App/logo.png" alt="Logo" class="logo1" />
    <div class="company-name">Learnr</div>
  </div>
  <div class="login-frame">
    <div class="main-content">
      <img src="/App/logo.png" alt="Logo" class="logo2" />
      <div class="title">Admin Login</div>
      <div class="login-form">
        <div class="form-group">
          <div class="subtitle">Username</div>
          <input
            v-model="email"
            type="text"
            class="login-input"
            placeholder="Enter your Username"
          />
        </div>
        <div class="form-group">
          <div class="subtitle">Password</div>
          <input
            v-model="password"
            type="password"
            class="login-input"
            placeholder="Enter your Password"
          />
        </div>
        <button @click="handleLogin" class="login-button">Login</button>
        <div class="warning-container">
          <div class="warning1">Not Admin?</div>
          <div class="warning2" @click="goToGenerator">Go Back to Home</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-frame {
  box-sizing: border-box;
  margin: 5% auto; /* Center the login frame horizontally and add margin at the top */
  padding-top: 30px;
  width: 90%; /* Adjust width relative to the viewport */
  max-width: 550px; /* Set a maximum width to prevent it from becoming too large */
  height: auto; /* Allow height to adjust based on content */
  max-height: 90vh; /* Set maximum height relative to the viewport */
  background: #F6F4F4;
  border-radius: 30px;
  display: flex;
  align-items: center; /* Center all items horizontally */
  flex-direction: column; /* Ensure children are stacked vertically */
  position: relative; /* Make this a reference for absolute positioning */
}

@media (min-width: 768px) {
  .login-frame {
    width: 60%; /* Adjust for medium to large screens */
  }
}

@media (min-width: 1024px) {
  .login-frame {
    width: 40%; /* Adjust for larger screens */
  }
}

.title {
  font-size: 30px;
  font-weight: bold;
}

.subtitle {
  font-size: 12px;
  font-weight: bold;
  line-height: 0.5; /* Set line-height to 1 to minimize any extra space */
  text-align: left; /* Ensure subtitles are aligned to the left */
  width: 100%; /* Ensure subtitle takes full width */
}

.header {
  display: flex;
  align-items: center;
  padding: 15px;
}

.logo1 {
  height: 25px; /* Adjust as needed */
  margin-right: 10px;
}

.logo2 {
  height: 50px; /* Adjust as needed */
  margin-right: 10px;
}

.company-name {
  font-size: 21px;
  font-weight: bold;
}
.warning-container {
  position: absolute; /* Position relative to login-frame */
  display: flex; /* Align items in a row */
  justify-content: center; /* Center the items horizontally */
  gap: 8px; /* Adjust the gap between warnings */
  bottom: 5px; /* Position the container at the bottom */
  width: 100%; /* Full width of the parent container */
  padding: 0 20px; /* Optional: add padding for better spacing */
  box-sizing: border-box; /* Ensure padding is included in width calculation */
  text-align: center; /* Center text within the container */
  left: 1%; /* Move the container to the left */
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
  line-height: 230%;
  word-wrap: break-word;
  margin-bottom: 20%;
  gap: 30px; /* Space between all children */
}

.login-form {
  width: 90%;
  max-width: 350px;
  margin: 0 auto; /* Center the form horizontally */
}

.form-group {
  width: 100%; /* Ensures input and subtitle take full width */
  margin-bottom: 8%; /* Space between form groups */
  text-align: center; /* Center the content within form group */
}

.login-input {
  width: 100%; /* Adjust width to fit within form group */
  padding: 10px; /* Adjust padding for better appearance */
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
  width: 100%; /* Adjust button width to fit within form group */
  font-size: 13px;
}

</style>
