<template>
    <div class="admin-profile">
        <!-- Navigation Bar -->
        <nav class="navbar">
            <div class="brand">
                <img src="/App/logo.png" alt="Learnr Logo" class="logo" />
                <span>Learnr</span>
            </div>
            <div class="nav-links">
                <router-link to="/history" class="nav-link">History</router-link>
                <router-link to="/AdminLogin" class="nav-link">Admin</router-link>
                <router-link to="/Generator" class="nav-link">Home</router-link>
            </div>
        </nav>
        <div id="cont_box">


            <!-- Profile Section -->
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-pic">
                        <span class="profile-initial">J</span>
                    </div>
                    <div class="profile-info">
                        <h1>{{ userName }}</h1>

                    </div>
                </div>
                <div class="stats">
                    <div class="stat">
                        <h2>{{ accuracy }}%</h2>
                        <p>Accuracy</p>
                    </div>
                    <div class="stat1"></div>
                    <div class="stat">
                        <h2>{{ exercises }}</h2>
                        <p>Exercises</p>
                    </div>
                </div>
            </div>

            <!-- History Section -->
            <div class="history-container">
            <div class="history-header">
                <span class="header-topic">Topic</span>
                <span class="tit_text header-practice">Total Practice</span>
                <span class="tit_text header-accuracy">Accuracy</span>
            </div>
            <ul class="history-list">
                <li v-for="(item, index) in history" :key="index" class="history-item">
                    <div class="history-topic">
                        <img class="tubiao" src="/App/tubiao.png" /> {{ item.title }}
                    </div>
                    <div class="history-practice">
                        {{ item.practice }}
                    </div>
                    <div class="history-accuracy">
                        {{ item.accuracy }}%
                    </div>
                </li>
            </ul>
        </div>
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
* {
    box-sizing: border-box;
}

.admin-profile {
    /* max-width: 1000px; */
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    width: 90vw;
    margin-left: 5vw;
    line-height: 80px;
    padding: 0px 30px;
    font-weight: 600;
}

.brand {
    display: flex;
    align-items: center;
}

.logo {
    height: 20px;
    margin-right: 15px;
}

.nav-links {
    display: flex;
    gap: 20px;
}

.nav-link {
    text-decoration: none;
    color: #333333;
    font-weight: bold;
    margin-left: 10vw;
}

#cont_box {
    max-width: 1000px;
    margin: 0px auto;
    margin-top: 20px;
}

.nav-link:hover {
    color: #156B3A;
}

.profile-container {
    background-color: #ffffff00;
    border-radius: 10px;
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
    margin-top: 20px;
}

.stat {
    width: 100%;
    border: 1px solid #777777;
    border-radius: 10px;
    text-align: center;
    padding: 10px 0px;
}

.stat1 {
    width: 20px;
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
    margin-top: 10px;
}

.history-container {
    max-width: 1000px;
    padding: 20px;
    border-top: 1px solid #777777;
    padding-top: 30px;
}

.history-list {
    list-style-type: none;
    padding: 0;
    font-weight: 600;
}

.history-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    /* Topic gets more space */
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    text-align: left;
    align-items: center;
    /* Ensure Topic is left-aligned */
}
.history-header .tit_text{
    text-align: center;
}
.history-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    /* Topic gets more space */
    padding: 15px 0;
    align-items: center;
    /* Center items vertically */
}
.tubiao{
    width: 34px;
    padding: 8px;
    background: #cccccc9b;
    border-radius:10px ;
    margin-right: 10px;
}
.history-topic {
    display: flex;
    align-items: center;
    /* Left-align Topic */
    font-size: 18px;
    color: #3e3e3e;
    /* Optional: Add padding for space */
}

.history-practice,
.history-accuracy {
    display: flex;
    align-items: center;
    justify-content: center;
    /* Keep Practice and Accuracy centered */
    font-size: 18px;
    color: #3e3e3e;
}
.history-accuracy{
    justify-content: right;
}
.history-header .header-accuracy{
    text-align: right;
}
</style>
