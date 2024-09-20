<template>
  <div class="generator" @click="closeDropdowns">
    <nav class="top">
      <div class="header">
        <img src="/App/logo.png" alt="Logo" class="top-logo" />
        <div class="web-name">Learnr</div>
      </div>
      <div class="nav-links">
        <router-link to="/history" class="nav-link">History</router-link>
        <router-link to="/AdminLogin" class="nav-link">Admin</router-link>
      </div>
    </nav>
    <div class="main-content">
      <div class="descript">
        <img src="../assets/icon/logo.png" alt="Logo" class="logo" />
        <h1>Question Generator</h1>
        <div>
          Get Started by selecting a topic and context from the dropdown menus below!
        </div>
      </div>
      <!-- Dropdown menus and send button at the bottom -->
      <div class="dropdown-container">
        <div class="dropdown">
          <button @click="toggleDropdown1" class="dropdown-button">
            {{ selectedTopic ? selectedTopic : 'Select a Topic' }}
            <span class="iconfont icon--shanglajiantou"></span>
          </button>
          <div v-if="isTopicDropdownVisible" class="dropdown-menu">
            <div 
              v-for="item in items1" 
              :key="item" 
              class="dropdown-item" 
              @click="selectTopic(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="dropdown">
          <button @click="toggleDropdown2" class="dropdown-button">
            {{ selectedContext ? selectedContext : 'Select Context' }}
            <span class="iconfont icon--shanglajiantou"></span>
          </button>
          <div v-if="isContextDropdownVisible" class="dropdown-menu">
            <div 
              v-for="item in items2" 
              :key="item" 
              class="dropdown-item" 
              @click="selectContext(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <button class="send-button" @click="sendData">
          <span class="iconfont icon-fasong"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Generator',
  data() {
    return {
      isTopicDropdownVisible: false,
      isContextDropdownVisible: false,
      // Store the selected topic
      selectedTopic: '', 
      // Store the selected context
      selectedContext: '', 
      // Options for the topic dropdown menu
      items1: [
        'DataFrame',
        'NMI (Normalised Mutual Information)',
        'Sentence splitting using nltk (i.e. nltk.sent_tokenize())',
        'Correlation',
        'Linear Regression',
        'Decision Tree Classifier',
        'Reading/Writing CSV files'
      ],
      // Options for the context dropdown menu
      items2: [
        'Koala Population in Australia',
        'Global Temperature Trends',
        'Predicting Disease Outbreaks',
        'Customer Purchase Behavior',
        'Stock Market Prediction',
        'Student Performance Prediction',
        'Traffic Flow Analysis',
        'Sales Forecasting',
        'Inventory Management'
      ]
    };
  },
  methods: {
    toggleDropdown1(event) {
      this.isTopicDropdownVisible = !this.isTopicDropdownVisible;
      this.isContextDropdownVisible = false;
      event.stopPropagation(); 
    },
    toggleDropdown2(event) {
      this.isContextDropdownVisible = !this.isContextDropdownVisible;
      this.isTopicDropdownVisible = false;
      event.stopPropagation(); 
    },
    selectTopic(item) {
      this.selectedTopic = item;
      this.isTopicDropdownVisible = false;
    },
    selectContext(item) {
      this.selectedContext = item;
      this.isContextDropdownVisible = false;
    },
    closeDropdowns(event) {
      // Close all drop-down boxes when clicking on other parts of the page
      if (!event.target.closest('.dropdown')) {
        this.isTopicDropdownVisible = false;
        this.isContextDropdownVisible = false;
      }
    },
    sendData() {
      const payload = {
        topic: this.selectedTopic,
        context: this.selectedContext
      };
      console.log('Sending data to backend:', payload);

      // Data is sent to the back end via HTTP requests
      axios.post('http://localhost:8383/api/sendData', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {console.log('Data sent successfully:', response.data)
      window.location.href = "/App/problem.html"})

      .catch(error => console.error('Error sending data:', error));
    }
  }
};
</script>

<style scoped>
.generator {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: Lexend, sans-serif;
  font-weight: 500;
  line-height: 40px;
  word-wrap: break-word;
}

.logo {
  height: 40px;
}

.dropdown-container {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
}

.dropdown {
  position: relative;
  flex: 1;
  margin-right: 10px;
}

.dropdown-button {
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
}

.dropdown-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  width: 100%;
}

.dropdown-item {
  font-size: 15px;
  padding: 5px 20px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #d7efd5;
}

.send-button {
  background-color: #156B3A;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  display: flex;
  align-items: center;
  padding: 15px;
}

.top-logo {
  height: 25px; /* Adjust as needed */
  margin-right: 10px;
}

.web-name {
  font-size: 21px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
  width: auto; /* Set width to auto to adjust based on content */
  margin-right: 30px; /* Move nav bar slightly away from the right edge */
}

.nav-link {
  text-decoration: none;
  color: #333333;
  font-weight: bold;
}

.nav-link:hover {
  color: #156B3A;
}
</style>
