<template>
    <div class="history">
        <!-- Navigation Bar -->
        <nav class="top">
            <div class="header">
                <img src="/App/logo.png" alt="Logo" class="top-logo" />
                <div class="web-name">Learnr</div>
            </div>
            <div class="nav-links">
                <router-link to="/AdminLogin" class="nav-link">Admin</router-link>
                <router-link to="/Generator" class="nav-link">Home</router-link>
            </div>
        </nav>

        <div id="notacceptCookie" v-if="!notShowPopWin">
            <div id="cookie-request">You must accept the cookie if you want check this page</div>
            <button @click="accept" id="accept-btn">Accept</button>
        </div>
        
        <div id="cont_box" v-else>
            <!-- Profile Section -->
        <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-pic">
                        <span class="profile-initial">S</span>
                    </div>
                    <div class="profile-info">
                        <h1>{{ userName }}</h1>
                        <h3>#{{ userID.toString().padStart(5, '0') }}</h3>
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
            
            <!-- Recent Problem Section -->
        <div class="recent-container" v-if="false">
            <div class="recent-header">Recent Five Questions</div>
                <div class="recent-datas">    
                    <div class="question-header">
                        <span class="question-topic">Question</span>
                        <span class="question-attempts">Attempts</span>
                        <span class="question-time">Time</span>
                        <span class="question-correct">Correct</span>
                    </div>

                    <ul class = "question-datas">
                        <li v-for="(attempt, attemptIndex) in recent" :key="attemptIndex" class="question-data">
                            <div class="topic">
                                {{ history[attempt.topic].title }}
                            </div>
                            <div class="attempt">
                                {{ attempt.attempt }}
                            </div>
                            <div class="time">
                                {{ (attempt.time/60).toFixed(2)  }}
                            </div>
                            <div class="correct">
                                <img :src="attempt.correctness ? '/App/assets/icon/true.png' : '/App/assets/icon/false.png'" alt="Correctness">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- History Section -->
        <div class="history-container">
            <!-- History Header -->
            <div class="history-header">
                <span class="header-topic">Topic</span>
                <span class="tit_text header-practice">Total Practice</span>
                <span class="tit_text header-accuracy">Accuracy</span>
            </div>
            <!-- History detail -->
            <ul class="history-list">
                <li  v-for="(item, index) in topicSummary" :key="index" >
                <div @click="questionDropdown(index)" class="history-item">
                    <div class="history-topic">
                        <img class="tubiao" src="/App/tubiao.png" /> {{ item.topic }}
                    </div>
                    <div class="history-practice">
                        {{ item.numQuestions }}
                    </div>
                    <div class="history-accuracy">
                        {{ item.accuracy }}%
                    </div>
                </div>
                    <!-- Question details -->

                    <div v-show="item.isExpanded" class="question-dropdown">
                <!-- <div v-show="true" class="question-dropdown"> -->
                    <!-- Question Dropdown Head -->
                    <div class="question-header">
                        <span class="question-topic">Question</span>
                        <span class="question-attempts">Attempts</span>
                        <span class="question-time">Total-Time (minutes)</span>
                        <span class="question-correct">Had Been Correct</span>
                    </div>

                    <!-- Question Dropdown data -->
                    <ul class = "question-datas">
                        <li @click="attemptDropdown(index, questionIndex)" 
                        v-for="(question, questionIndex) in item.attemptedQuestions" 
                        :key="questionIndex" class="question-data">  
                            <div class="question">
                                {{ question.questionID }}
                            </div>
                            <div class="attempts">
                                {{ question.numAttempts }}
                            </div>
                            <div class="time">
                                {{ (question.totalTime/60).toFixed(2) }}
                            </div>
                            <div class="correct">
                                <img :src="question.correct ? '/App/assets/icon/true.png' : '/App/assets/icon/false.png'" alt="Correctness">
                            </div>
                            
                            <!-- Attempts Dropdown -->
                            <div v-show="question.isExpanded" class="attempt-dropdown">
                            <!-- <div v-show="true" class="attempt-dropdown"> -->
                                <!-- Attempt Dropdown Header -->
                                <div class="attempts-header">
                                    <span class="question-topic">Attempt</span>
                                    <span class="question-time">Time (minutes)</span>
                                    <span class="question-correct">Correct</span>
                                </div>

                                <!-- Attempt Dropdown data -->
                                <ul class="attempts-datas">
                                    <li v-for="(attempt, attemptIndex) in question.attempts" 
                                    :key="attemptIndex" class="attempts-data">
                                        <div class="attempt">
                                            {{ attempt.attemptID }}
                                        </div>
                                        <div class="time">
                                            {{ (attempt.time/60).toFixed(2) }}
                                        </div>
                                        <!-- <div class="date">
                                            {{ attempt.date }}
                                        </div> -->
                                        <div class="correct">
                                            <img :src="attempt.correct ? '/App/assets/icon/true.png' : '/App/assets/icon/false.png'" alt="Correctness">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>                  

                </li>
            </ul>
        </div>


        </div>
    </div>
</template>

<script>
// import {getCookie, setCookie} from "../libs/cookie.js"
import { getUserID, getUserHistory } from "../libs/user.js"

export default {
    mounted () {
        const isAdmin = (this.$route.query.isAdmin);
            // console.log("isAdmin: "+ isAdmin + " type: " + typeof(isAdmin))
            // console.log("cookie-acception: " + this.$cookies.get('acception'))
        this.notShowPopWin = (isAdmin == 'true') || (this.$cookies.get('acception') == 'true')
            // console.log("acceptCookie: " + this.acceptCookie)
        
        // use different methods get user id
        if (this.notShowPopWin && !this.$route.query.userID) {
            this.userID = this.$cookies.get('userID')
            // console.log("get id from cookie")
        }
        else {
            this.userID = this.$route.query.userID
            // console.log("get id from previous page")
        }

        // id user id exist, then get userdata
        if (this.userID) {
            this.setUserData()
        }

        // const userID = this.$cookies.get('userID')
        // console.log("UserID: "+ userID + "type: " + typeof(userID))
        // const datas = await getUserHistory(userID) 
        // console.log(datas.userData.accuracy)
    },
    data() {
        return {
            notShowPopWin: null,
            // acceptCookie: true,
            userName: "Student",
            userID: null,
            accuracy: null,
            exercises: null,
            topicSummary: null
            // topicSummary: [
            // {Topic: "Decision Tree Classifier", numQuestions: 2, Accuracy: 50, 
            //     attemptedQuestions: [
            //         {
            //             questionID: 1, numAttempts: 3, correct: true, totalTime: 123, // have been correct
            //             attempts: [
            //                 { attemptID: 1, time: 345, correct: false },
            //                 { attemptID: 2, time: 245, correct: true },
            //                 { attemptID: 3, time: 256, correct: false },
            //             ]
            //         },
            //         {
            //             questionID: 2, numAttempts: 4, correct: false, totalTime: 123, // have been correct
            //             attempts: [
            //                 { attemptID: 1, time: 345, correct: false },
            //                 { attemptID: 2, time: 245, correct: false },
            //                 { attemptID: 3, time: 256, correct: false },
            //                 { attemptID: 4, time: 256, correct: false }
            //             ]
            //         }
            //     ]},
            // { Topic: "Linear Regression", numQuestions: 100, Accuracy: 80, 
            //     attemptedQuestions: [
            //         {
            //             questionID: 1, numAttempts: 3, correct: true, totalTime: 123, // have been correct
            //             attempts: [
            //                 { attemptID: 1, time: 345, correct: false },
            //                 { attemptID: 2, time: 245, correct: true },
            //                 { attemptID: 3, time: 256, correct: false },
            //             ]
            //         },
            //         {
            //             questionID: 2, numAttempts: 4, correct: false, totalTime: 123, // have been correct
            //             attempts: [
            //                 { attemptID: 1, time: 345, correct: false },
            //                 { attemptID: 2, time: 245, correct: false },
            //                 { attemptID: 3, time: 256, correct: false },
            //                 { attemptID: 4, time: 256, correct: false }
            //             ]
            //         }
            //     ]},
            // { Topic: "Correlation", numQuestions: 78, Accuracy: 65, 
            //     attemptedQuestions: [
            //         {
            //             questionID: 1, numAttempts: 3, correct: true, totalTime: 123, // have been correct
            //             attempts: [
            //                 { attemptID: 1, time: 345, correct: false },
            //                 { attemptID: 2, time: 245, correct: true },
            //                 { attemptID: 3, time: 256, correct: false },
            //             ]
            //         },
            //         {
            //             questionID: 2, numAttempts: 4, correct: false, totalTime: 123, // have been correct
            //             attempts: [
            //                 { attemptID: 1, time: 345, correct: false },
            //                 { attemptID: 2, time: 245, correct: false },
            //                 { attemptID: 3, time: 256, correct: false },
            //                 { attemptID: 4, time: 256, correct: false }
            //             ]
            //         }
            //     ]},
            // { Topic: "NMI", numQuestions: 133, Accuracy: 70, 
            //     attemptedQuestions: [
            //         {
            //             questionID: 1, numAttempts: 3, correct: true, totalTime: 123, // have been correct
            //             attempts: [
            //                 { attemptID: 1, time: 345, correct: false },
            //                 { attemptID: 2, time: 245, correct: true },
            //                 { attemptID: 3, time: 256, correct: false },
            //             ]
            //         },
            //         {
            //             questionID: 2, numAttempts: 4, correct: false, totalTime: 123, // have been correct
            //             attempts: [
            //                 { attemptID: 1, time: 345, correct: false },
            //                 { attemptID: 2, time: 245, correct: false },
            //                 { attemptID: 3, time: 256, correct: false },
            //                 { attemptID: 4, time: 256, correct: false }
            //             ]
            //         }
            //     ]},
            // { Topic: "Correlation", numQuestions: 60, Accuracy: 90, 
            //     attemptedQuestions: [
            //         {
            //             questionID: 1, numAttempts: 3, correct: true, totalTime: 123, // have been correct
            //             attempts: [
            //                 { attemptID: 1, time: 345, correct: false },
            //                 { attemptID: 2, time: 245, correct: true },
            //                 { attemptID: 3, time: 256, correct: false },
            //             ]
            //         },
            //         {
            //             questionID: 2, numAttempts: 4, correct: false, totalTime: 123, // have been correct
            //             attempts: [
            //                 { attemptID: 1, time: 345, correct: false },
            //                 { attemptID: 2, time: 245, correct: false },
            //                 { attemptID: 3, time: 256, correct: false },
            //                 { attemptID: 4, time: 256, correct: false }
            //             ]
            //         }
            //     ]}
            // ]
        };
    },
    methods: {
        // checkCookie() {
        //     const acception = getCookie("acception")
        //     if (acception == "true") {
        //         // console.log("acception is false")
        //         this.acceptCookie = true
        //     } else {
        //         console.log(acception + " acception is false or does not exist")
        //         this.acceptCookie = false
        //     }
        // },
        async setUserData() {
            const datas = await getUserHistory(this.userID) 
            this.accuracy = datas.userData.accuracy
            this.exercises = datas.userData.numQuestions
            this.topicSummary = datas.userData.topicSummary
            // console.log(datas.userData.accuracy)
        },

        async accept() {
            // this.acceptCookie = true,
            // setCookie("acception", "true", 5)
            this.$cookies.set('acception', true, '3m');
            this.userID = await getUserID()
            this.$cookies.set('userID', this.userID, '3m');
            this.$router.go(0);
        },
        questionDropdown(index) {
        this.topicSummary[index].isExpanded = !this.topicSummary[index].isExpanded;
        },
        attemptDropdown(topicIndex, questionIndex) {
        this.topicSummary[topicIndex].attemptedQuestions[questionIndex].isExpanded = 
        !this.topicSummary[topicIndex].attemptedQuestions[questionIndex].isExpanded
        },
        formatTime(seconds) {
        const minutes = Math.floor(seconds / 60); 
        const sec = seconds % 60; 

        return `${minutes}m ${sec < 10 ? '0' + sec : sec}s`; 
        },
  }
};
</script>

<style scoped>
* {
    box-sizing: border-box;
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

#cont_box {
    max-width: 1000px;
    margin: 0px auto;
    margin-top: 20px;
}

.profile-container {
    background-color: #ffffff00;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
}

.profile-header {
    display: flex;
    align-items: center;
}

.profile-pic {
    width: 80px;
    height: 80px;
    background-color: #e61b0c;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 36px;
}

.profile-info {
    margin-left: 20px;
}

.profile-info h1 {
    margin: 0;
    font-size: 28px;
    font-weight: bold;
    color: #333333;
}


.profile-info h3 {
    font-weight: bold;
    color: #333333;
}

.stats {
    display: flex;
    margin-top: 10px;
}

.stat {
    width: 100%;
    border: 1px solid #777777;
    border-radius: 10px;
    text-align: center;
    padding: 5px 0px;
}

.stat1 {
    width: 10px;
}

.stat h2 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #333333;
}

.stat p {
    margin: 0;
    font-size: 14px;
    color: #777777;
    margin-top: 5px;
}

/* recent part */
.recent-container {
    max-width: 1000px;
    padding: 20px;
    border-top: 1px solid #777777;
    padding-top: 20px;
    overflow: auto; 
    font-weight: 600;
    color: #3e3e3e;
}
.recent-header {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

/* history part */
.history-container {
    max-width: 1000px;
    padding: 20px;
    border-top: 1px solid #777777;
    padding-top: 30px;
    overflow: auto; 
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
    position: relative;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    /* Topic gets more space */
    padding: 15px 0;
    align-items: center;
    /* Center items vertically */
    cursor: pointer;
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

.question-dropdown {
    /* position: absolute; */
    grid-column: span 3;
    background-color: transparent;
    list-style-type: none;
    padding: 20;
    margin: 20;
    width: 100%;
    align-items: center;
    border: solid #777777;
    border-width: 1px 0 1px;
    color: #3e3e3e;
    /* overflow-y: auto;
    max-height: 350px; */
    margin-top: 20px; 
    
}

.attempt-dropdown{
    grid-column: span 4;
    background-color: transparent;
    list-style-type: none;
    padding: 20;
    margin: 20;
    /* width: 90%; */
    width: 100%;
    align-items: center;
    border: solid #777777;
    border-width: 1px 0 1px;
    color: #3e3e3e;
    margin-top: 20px; 
    /* margin: 20 auto */
}

.question-datas {
    overflow-y: auto;
    max-height: 350px; 
    /* margin-top: 10px; */
    margin: 0; /* 移除外边距 */
    padding: 0; /* 移除内边距 */
}

/* scroll bar style */
.question-datas::-webkit-scrollbar {
    background-color: #CFD1B8;
    border-radius: 10px;
}
.question-datas::-webkit-scrollbar-thumb {
    background-color: #A8BA99;
    border-radius: 10px;
}

.question-header {
    position: sticky;
    /* position: relative; */
    top : 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 10px 0;
    align-items: center;
    text-align: center;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    color: #3e3e3e;
}

.attempts-header {
    /* position: sticky; */
    position: relative;
    top : 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 10px 0;
    align-items: center;
    text-align: center;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    color: #3e3e3e;
}

.question-data {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    /* Topic gets more space */
    padding: 10px 0;
    align-items: center;
    border-radius: 40px
    /* Center items vertically */
}
.question-data:hover {
    /* background-color: #b3c1a0; */
    /* background-color: #538665; */
    background-color: #ccf6b34b;
}
.attempts-datas {
    margin: 0; /* 移除外边距 */
    padding: 0; /* 移除内边距 */
}
.attempts-data {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /* Topic gets more space */
    padding: 10px 0;
    align-items: center;
    border-radius: 40px
    /* Center items vertically */
}

.question {
    /* padding-left: 120px; */
    text-align: center
}
.topic {
    padding-left: 10px
}
.attempts {
    text-align: center
    /* padding-left: 85px; */
}
.attempt {
    text-align: center
}
.time {
    /* padding-left: 90px; */
    text-align: center
}

.date {
    text-align: center
}
.correct {
    text-align: center
}
.correct img {
  width: 20px; /* 根据需求调整图片大小 */
  height: 20px;
}
#notacceptCookie{
    display: flex;
    /* justify-content: center; 水平居中 */
    align-items: center;
    flex-direction: column;
    row-gap: 50px;
    margin-top: 12.5%;
    margin-bottom: 25%;
}
#cookie-request{
    /* justify-content: center; */
    font-weight: 600;
    font-size: 32px;
    color: #c93c32;
}
#accept-btn{
    border: none;
    border-radius: 7px;
    padding: 10px;
    cursor: pointer;
    font-weight: 700;
    font-size: 24px;
    background-color: #e58110;
    /* box-shadow: inset 3px 3px 8px rgba(0, 0, 0, 0.3), inset -3px -3px 8px rgba(255, 255, 255, 0.1); */
    transition: all 0.3s ease;
}
#accept-btn:hover{
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3), -3px -3px 8px rgba(255, 255, 255, 0.2);
}

</style>
