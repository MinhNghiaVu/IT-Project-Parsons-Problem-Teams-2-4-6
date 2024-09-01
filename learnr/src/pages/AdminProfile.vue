<template>
    <div class="admin-profile">
      <!-- Navigation Bar -->
      <nav class="navbar">
        <div class="brand">
          <img src="/logo.png" alt="Learnr Logo" class="logo" />
          <span>Learnr</span>
        </div>
        <div class="nav-links">
          <router-link to="/history" class="nav-link">History</router-link>
          <router-link to="/admin" class="nav-link">Admin</router-link>
          <router-link to="/home" class="nav-link">Home</router-link>
        </div>
      </nav>
  
      <!-- Profile Section -->
      <div class="profile-container">
        <div class="profile-header">
          <div class="profile-pic">
            <span class="profile-initial">J</span>
          </div>
          <div class="profile-info">
            <h1>{{ userName }}</h1>
            <div class="stats">
              <div class="stat">
                <h2>{{ accuracy }}%</h2>
                <p>Accuracy</p>
              </div>
              <div class="stat">
                <h2>{{ exercises }}</h2>
                <p>Exercises</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- History Section -->
      <div class="history-container">
        <h2>Topic</h2>
        <ul>
          <li v-for="(item, index) in history" :key="index" class="history-item">
            <div class="history-topic">
              <span class="history-icon">📊</span> {{ item.title }}
            </div>
            <div class="history-details">
              <div class="practice">Total Practice: {{ item.practice }}</div>
              <div class="accuracy">Accuracy: {{ item.accuracy }}%</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userName: "Jane",
        accuracy: 60,
        exercises: 5,
        history: [
          { title: "Decision Tree Classifier", practice: 90, accuracy: 77 },
          { title: "Linear Regression", practice: 100, accuracy: 80 },
          { title: "Correlation", practice: 78, accuracy: 65 },
          { title: "NMI", practice: 133, accuracy: 70 },
          { title: "Correlation", practice: 60, accuracy: 90 }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .admin-profile {
    max-width: 1000px;
    margin: 40px auto;
    padding: 20px;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  
  .brand {
    display: flex;
    align-items: center;
  }
  
  .logo {
    height: 30px;
    margin-right: 10px;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
  }
  
  .nav-link {
    text-decoration: none;
    color: #333333;
    font-weight: bold;
  }
  
  .nav-link:hover {
    color: #156B3A;
  }
  
  .profile-container {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin-bottom: 20px;
  }
  
  .profile-header {
    display: flex;
    align-items: center;
  }
  
  .profile-pic {
    width: 120px;
    height: 120px;
    background-color: #e61b0c;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 48px;
  }
  
  .profile-info {
    margin-left: 30px;
  }
  
  .profile-info h1 {
    margin: 0;
    font-size: 36px;
    font-weight: bold;
    color: #333333;
  }
  
  .stats {
    display: flex;
    margin-top: 10px;
  }
  
  .stat {
    margin-right: 40px;
  }
  
  .stat h2 {
    margin: 0;
    font-size: 28px;
    font-weight: bold;
    color: #333333;
  }
  
  .stat p {
    margin: 0;
    font-size: 18px;
    color: #777777;
  }
  
  .history-container {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .history-container h2 {
    font-size: 28px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20px;
  }
  
  .history-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #eeeeee;
  }
  
  .history-topic {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #555555;
  }
  
  .history-icon {
    margin-right: 10px;
  }
  
  .history-details {
    display: flex;
    gap: 30px;
    font-size: 18px;
    color: #777777;
  }
  
  .practice {
    font-weight: bold;
  }
  
  .accuracy {
    font-weight: bold;
  }
  </style>
  