<template>
  <div class="generator">
    <div class="main-content">
      <img src="../assets/icon/logo.png" alt="Logo" class="logo" />
      <h1>Question Generator</h1>
      <div>
        Get Started by selecting a topic and content from the dropdown menus below!
      </div>
      <!-- Dropdown menus and send button at the bottom -->
      <div class="dropdown-container">
        <div class="dropdown">
          <button @click="toggleDropdown1" class="dropdown-button">Topic
            <span class="iconfont icon--shanglajiantou"></span>
          </button>
          <div v-if="isDropdownVisible1" class="dropdown-menu">
            <div v-for="item in items1" :key="item" class="dropdown-item">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="dropdown">
          <button @click="toggleDropdown2" class="dropdown-button">Context
            <span class="iconfont icon--shanglajiantou"></span>
          </button>
          <div v-if="isDropdownVisible2" class="dropdown-menu">
            <div v-for="item in items2" :key="item" class="dropdown-item">
              {{ item }}
            </div>
          </div>
        </div>
        <button class="send-button">
          <span class="iconfont icon-fasong"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Generator',
  data() {
    return {
      isDropdownVisible1: false, // Track the visibility of the first dropdown
      isDropdownVisible2: false, // Track the visibility of the second dropdown
      items1: [
        'DataFrame',
        'NMI (Normalised Mutual Information)',
        'Sentence splitting using nltk (i.e. nltk.sent_tokenize())',
        'Correlation',
        'Linear Regression',
        'Decision Tree Classifier',
        'Reading/Writing CSV files'
      ], // Options for the first dropdown menu
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
      ] // Options for the second dropdown menu
    };
  },
  methods: {
    toggleDropdown1() {
      this.isDropdownVisible1 = !this.isDropdownVisible1; // Toggle first dropdown visibility
    },
    toggleDropdown2() {
      this.isDropdownVisible2 = !this.isDropdownVisible2; // Toggle second dropdown visibility
    }
  }
};
</script>

<style scoped>
.generator {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex: 1; /* Allow main content to take up available space */
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
  margin-bottom: 80px; /* Adjust this value to move main content up */
}

.logo {
  margin-bottom: 20px; /* Add spacing below the logo */
}

.dropdown-container {
  display: flex; /* Align dropdowns and button horizontally */
  justify-content: space-between; /* Space items evenly */
  position: fixed; /* Fix dropdowns and button at the bottom */
  bottom: 0;
  width: 100%; /* Full width of the screen */
  padding: 10px;
  background: transparent; /* Ensure background remains as per your design */
}

.dropdown {
  position: relative;
  flex: 1; /* Allow dropdowns to take up space */
  margin-right: 10px; /* Space between dropdowns and the button */
}

.dropdown-button {
  background-color: #156B3A;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%; /* Full width of the dropdown */
}

.dropdown-menu {
  position: absolute;
  bottom: 100%; /* Position the menu above the button */
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px; /* Adjust the max height as needed */
  overflow-y: auto; /* Enable vertical scroll when content overflows */
  width: 100%; /* Full width of the dropdown menu */
}

.dropdown-item {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.send-button {
  background-color: #156B3A;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%; /* Make the button circular */
  cursor: pointer;
  flex-shrink: 0; /* Prevent the button from shrinking */
  width: 50px; /* Set width and height for the circle */
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
