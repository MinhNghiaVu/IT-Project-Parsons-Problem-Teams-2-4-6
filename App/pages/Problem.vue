<template>
    
    <body>
        <!-- 导航 + 计时 -->
        <div id=" top-panel">
            <!-- 导航栏 -->
            <nav class="top">
            <div class="header">
                <img src="/App/logo.png" alt="Logo" class="top-logo" />
                <div class="web-name">Learnr</div>
            </div>
            <div class="nav-links">
                <router-link to="/AdminLogin" class="nav-link">Admin</router-link>
                <div @click="historyBotton" class="nav-link">History</div>
                <router-link to="/Generator" class="nav-link">Home</router-link>
            </div>
            </nav>
    
            <!-- 进度条 -->
            <div id="progress-container">
                <!-- <div id="progress-percent">0%</div>
                <div id="progress-bar">
                    <div id="progress"></div>
                </div> -->
                <div id="time-elapsed">0 mins 0 seconds</div>
                <a id="regenerate-btn"> 
                        <button>Regenerate</button>
                </a>
            </div>
        </div>
    
        <!-- 下部分，问题+输出 -->
        <main id = "main-box">
            <!-- 左侧面板，问题和拖动代码块的区域 -->
            <div id="left-panel">

                <div v-if="loading" id="loading-overlay">
                    <img src="../loading3.gif" width="50" height="50" lass="loading-icon"/>
                    <p class="loading-text">{{ loadingWord }}</p>
                </div>

                <div id="left-content">
                    <h2 id="topicdescription">Parsons Problem Topic</h2>
                    <div id="question-content">
                        <p id="questiondescription">Questiondescriptiondewjiodewjioewjidowjdoewjiodewjiodewj</p> <!-- 问题描述 -->
                        <br>
                        <p id="expectedoutput">expectedoutput</p>
                    </div>
                    
                    <!--<a id="regenerate-btn" href="regen_demo_page.html"> -->
                    <!--    <button>Regenerate</button>-->
                    <!--</a>-->
                    
                </div>
                
                <div id="sortableTrash" class="sortable-code"> </div>
            </div>
            
            <!-- 可拖动的中分线 -->
            <div id="divider"></div>
    
            <!-- 右侧面板，用户构建解决方案的区域 -->
            <div id="right-panel">
                <div id="right-top">
                    <!-- <div id="code-table"> -->
                    <div id="sortable" class="sortable-code"></div>
                    <!-- </div> -->
                    <div id="button-group">
                        <button id="run-btn">
                            <i class="fas fa-play"></i> Run
                        </button>
                        <button id="reset-btn">
                            <i class="fas fa-undo"></i> Reset
                        </button>
                        <button id="submit-btn">
                            <i class="fas fa-paper-plane"></i> Submit
                        </button>
                    </div>
                </div>
                
                <!-- 右侧可移动线 -->
                <div id="horizontal-divider"></div>
    
                <!-- output 栏 -->
                <div id="calculated-value"> 
                    <div id="output-icon">
                        <!-- <i class="fas fa-chevron-left"></i> 
                        <i class="fas fa-chevron-right"></i> Output</div> -->
                        <i class="fas fa-code"></i> Output</div>
                    <br>
                    <div id="output"></div>
                    <div id="feedback"></div>
                </div>
            </div>

            <div id="resultMessage">
                <button id="escape-btn"><i class="fa-solid fa-xmark"></i></button>
                <p>Correct answer! Congratulations!</p>
                <div id="button-container">
                    <button id="window-regenerate-btn" class="finish-button">Regenerate</button>
                    <button id="window-retry-btn" class="finish-button">Try Again</button>
                    <button id="window-back-btn" class="finish-button" @click="goBackHome">Back Home</button>
                </div>
            </div>

        </main>
    
    </body>
    </template>
    
    
    
    <script>
    //todo remove these samples after testing
    // let initial = "print('Hello')\n" +
    //             "print('Parsons')\n" +
    //             "print('problems!')";

    // let testSample  = "fruits = ['apple', 'banana', 'cherry']\n" +
    //                            "for x in fruits :\n" +
    //                          "  print(x)";

    // let testSample2  = "print('Hello')\n" +
    //             "print('Parsons')\n" +
    //             "print('problems!')";                          
                      



    //let startTime;
    import LZString from 'lz-string';
    import { compress } from 'lz-string';
    let intervalId;
    let elapsedTime;
    let timerLock = false;
    import axios from 'axios';
    export default {
        data() {
            return {
                topic : '',
                context : '' ,
                questionID : '',
                loading: false,
                sharelink: '',
                prevAnswerCode: '',
                loadingWord: "Regenerating questions may take some time, please be patient...",
            }
        },
        
        // created(){
        //     this.topic = this.$route.query.topic;
        //     this.context = this.$route.query.context;
        // },

        mounted() {
            this.midDragControllerDiv();
            this.horDragControllerDiv();
            //this.fetchStrings(); // Fetch initial strings on mount
            this.startTimer(); 
            this.initializer();
        },
    
        methods: {
            historyBotton() {
                this.$router.push({
                    path: '/History',
                    query: {
                    isAdmin: false,
                    userID: this.$cookies.get('userID')
                    }
                })
            },

            goBackHome() {
                this.$router.push('/Generator'); // 跳转到 "/Generator" 页面
            },
            // Mid resize
            midDragControllerDiv() {
                const divider = document.getElementById('divider');
                const leftPanel = document.getElementById('left-panel');
                const rightPanel = document.getElementById('right-panel');
    
                let isDragging = false;
    
                divider.addEventListener('mousedown', function(e) {
                    isDragging = true;
                });
    
                document.addEventListener('mousemove', function(e) {
                    if (isDragging) {
                        let offsetX = e.clientX;
                        let totalWidth = window.innerWidth;
    
                        // 计算新的左侧和右侧面板的宽度百分比
                        let leftWidth = (offsetX / totalWidth) * 100;
                        let rightWidth = 100 - leftWidth;
    
                        // 限制最小和最大宽度
                        if (leftWidth < 10) leftWidth = 10;
                        if (rightWidth < 10) rightWidth = 10;
    
                        leftPanel.style.width = leftWidth + '%';
                        rightPanel.style.width = rightWidth + '%';
                    }
                });
    
                document.addEventListener('mouseup', function() {
                    isDragging = false;
                });
            },
    
            // horizontal resize
            horDragControllerDiv() {
                const horizontalDivider = document.getElementById('horizontal-divider');
                const topSection = document.getElementById('right-top');
                const bottomSection = document.getElementById('calculated-value');
                const rightPanel = document.getElementById('right-panel');
                
                let isDragging = false;
                let startY = 0;
                let startTopHeight = 0;

                horizontalDivider.addEventListener('mousedown', function(e) {
                    isDragging = true;
                    startY = e.clientY; 
                    startTopHeight = topSection.offsetHeight; 
                    document.body.style.cursor = 'ns-resize';
                });

                document.addEventListener('mousemove', function(e) {
                    if (isDragging) {
                        let diffY = e.clientY - startY;
                        let totalHeight = rightPanel.offsetHeight;

                        let newTopHeight = startTopHeight + diffY;
                        let newBottomHeight = totalHeight - newTopHeight - horizontalDivider.offsetHeight;

                        if (newTopHeight < totalHeight * 0.1) newTopHeight = totalHeight * 0.1;
                        if (newBottomHeight < totalHeight * 0.1) newTopHeight = totalHeight - totalHeight * 0.1 - horizontalDivider.offsetHeight;

                        topSection.style.height = newTopHeight + 'px';
                        bottomSection.style.height = newBottomHeight + 'px';

                        bottomSection.style.overflow = 'auto '; 
                    }
                });

                document.addEventListener('mouseup', function() {
                    isDragging = false;
                    document.body.style.cursor = 'default';
                });
            },
            initializer(){
                this.topic = this.$route.query.topic;
                this.context = this.$route.query.context;
                
                var compressedData = this.$route.query.shareLink;
                // var data =  JSON.parse(this.$route.query.response);
                this.sharelink = JSON.parse(LZString.decompressFromEncodedURIComponent(compressedData));
                //todo uncomment below code after merging with new server
                //initialCode = data.question
                this.questionInitializer(this.sharelink);
                
            },
            questionInitializer(data){
                const initialCode = data.question.Code; // Update initial code
                
                this.questionID = data.questionID;
                document.getElementById('questiondescription').textContent = data.question.Description;
                document.getElementById('expectedoutput').textContent = data.question.ExpectedOutput;
                // todo 改成七选一的topic
                document.getElementById('topicdescription').textContent = this.topic;
                this.initializeParsonsWidget(initialCode); // Initialize Parsons widget with fetched code
            },

            startTimer() {
                elapsedTime = 0;
                timerLock = false;

                intervalId = setInterval(() => {
                    if(!timerLock){
                        elapsedTime++; 
                        this.updateTimeElapsed(); 
                    }
                }, 1000);
            },

            
            updateTimeElapsed() {
                const minutes = Math.floor(elapsedTime / 60); 
                const seconds = elapsedTime % 60; 

                
                document.getElementById('time-elapsed').textContent = `${minutes} mins ${seconds} seconds`;
            },

            
            stopTimer() {
                clearInterval(intervalId); 
                timerLock = true;
            },

            activeTimer(){
                timerLock = false;
            },
            
            refreshTimer() {
                console.log("refreshed");
                this.stopTimer(); 
                elapsedTime = 0;
                // activeTimer();
                document.getElementById('time-elapsed').textContent = '0 mins 0 seconds'; 
            },

            duplicateCheck(code){
                if (code == this.prevAnswerCode){
                    alert("code is same as previous");
                    return false;
                }
                this.prevAnswerCode = code;
                return true;
            },

            async runCode(code) {
                const url = 'http://localhost:8383/api/question/runPython'; // Replace with your actual backend URL if deployed

                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        pythonCode: code  // Send the Python code to the backend
                    })
                };

                try {
                    const response = await fetch(url, options);
                    const result = await response.json(); // Convert the response to JSON
                    //console.log(result); // Output the response to the console
                    
                    return result;
                    // Display the output or errors from the Python code execution in caller
                    
                } catch (error) {
                    console.error('Error:', error);
                }
            },
            
            
            
            //todo regenerate-btn 的功能
            //todo window-regenerate-btn 的功能
            

            async regenerateTester(){
                
                this.regenerate();
                
                // this.initializeParsonsWidget(testSample2);
            },

            async regenerate(){
                
                var payload;
                if (this.$cookies.isKey("userID")) {
                    payload = {
                    topic: this.topic,
                    context: this.context,
                    userID : this.$cookies.get("userID"),
                    };
                } else {
                    payload = {
                    topic: this.topic,
                    context: this.context
                    };
                }
                
                console.log('Sending data to backend:', payload);

                this.loading = true;
                document.getElementById('left-content').style.display = 'none';
                document.getElementById('sortableTrash').style.display = 'none';
                // document.getElementById('loading-overlay').style.display = 'none';
                

                axios.get('http://localhost:8383/api/question/generateQuestion', {
                    params: payload,  // This sends topic, context, and userID as query parameters
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    //console.log('Data received successfully:', response.data);
                    // Push to Problem page, passing the received data via query parameters
                    this.questionInitializer(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                })
                .finally(() => {
                    this.loading = false; 
                    document.getElementById('left-content').style.display = 'flex';
                    document.getElementById('sortableTrash').style.display = 'flex';
                    // document.getElementById('loading-overlay').style.display = 'none';  
                });
            },


            refreshOutput(){
                document.getElementById('output').textContent = ""
                // document.getElementById('resultMessage').style.display = 'none';
            },



            emptyCheck(studentCode){
                if(studentCode === ""){
                    document.getElementById('output').textContent = "no blocks was used!";
                    return true;
                }
                return false;
            },

            getStudentCode(parson) {
                console.log(parson);
                console.log(parson.modified_lines);
                const codeLines = [];

                // Loop through each block in the current order (in the UI's sortable list)
                $('#sortable li').each(function(index) {
                    const lineText = $(this).text(); // Get the text of the current block (code line)
                    
                    // Find the corresponding modified line based on the index
                    const lineData = parson.modified_lines.find(modLine => modLine.code.trim() === lineText.trim());
                    
                    if (lineData) {
                        // Apply indentation based on the `indent` value from the corresponding modified line
                        const indentedLine = '    '.repeat(lineData.indent) + lineData.code;
                        codeLines.push(indentedLine); // Add the indented line to the array
                    } else {
                        // Fallback if we can't find the matching line, just push it without indentation
                        codeLines.push(lineText);
                    }
                });

                // Join the code lines into a single string
                const studentCode = codeLines.join('\n');
                return studentCode;
            },

            //sending the result back to server
            //add more parameters
            async sendAttempt(correctness){
                if(this.$cookies.get('acception') !== 'true'){
                    return;
                }
                //todo change time to a variable
                var pack = {
                    questionID: this.questionID,
                    userID : this.$cookies.get('userID'),
                    correct : correctness,
                    time : Number(elapsedTime),
                    topic : this.topic
                }
                //this.refreshTimer();
                const url = 'http://localhost:8383/api/question/submitAttempt'; // Replace with your actual backend URL if deployed

                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(pack)
                };
                //not sure if we need a response for this, maybe we need?
                try {
                    console.log(pack);
                    const response = await fetch(url, options);
                    const result = await response.json(); // Convert the response to JSON
                    console.log(result); // Output the response to the console
                    
                    //return result;
                    // Display the output or errors from the Python code execution
                    
                } catch (error) {
                    console.error('Error:', error);
                }
            },

            displayErrors(fb) {
                if (fb.errors.length > 0) {
                    alert(fb.errors[0]);
                }
            },

            initializeParsonsWidget(question) {
                //question = testSample;
                console.log(question);
                
                
                this.runCode(question).then(solution => {

                    // console.log("Solution retrieved:", solution);
                
                    var parson = new ParsonsWidget({
                        sortableId: 'sortable',
                        trashId: 'sortableTrash',
                        max_wrong_lines: 1,
                        feedback_cb : this.displayErrors,
                        can_indent: true
                    });
                    // console.log(parson);
                    parson.init(question);
                    parson.shuffleLines();
                
                    document.getElementById('run-btn').addEventListener('click', () => {
                        this.refreshOutput();
                        // console.log("0000");
                        var studentCode = this.getStudentCode(parson);
                        if(!this.emptyCheck(studentCode)){

                            this.runCode(studentCode).then(
                                result => {
                                    document.getElementById('output').textContent = result.output || result.error;
                                    console.log("run-btn");
                                }
                            )
                        }

                    //document.getElementById('output').textContent = studentCode; // Display the code
                    });


                    document.getElementById('submit-btn').addEventListener('click', async () => {
                        // console.log("press submit");
                        var studentCode = this.getStudentCode(parson);
                        //runsubmit should be a no return function, this is now for testing
                        this.stopTimer();
                        const submitButton = document.getElementById('submit-btn');
                        submitButton.disabled = true;
                        if(!this.emptyCheck(studentCode) && !this.duplicateCheck(studentCode)){
                            this.runSubmit(studentCode,solution);       
                            this.refreshTimer();
                        }
                        this.startTimer();
                        submitButton.disabled = false;
                    });

                    document.getElementById('reset-btn').addEventListener('click', () => {
                        parson.shuffleLines(); // Reshuffle the blocks for a new attempt
                        // this.refreshTimer();
                        // this.startTimer();
                    });

                    document.getElementById('window-retry-btn').addEventListener('click',() => {
                        document.getElementById('resultMessage').style.display = 'none';
                        parson.shuffleLines();
                    });

                    document.getElementById('escape-btn').addEventListener('click',() => {
                        document.getElementById('resultMessage').style.display = 'none';
                    });
 
                    document.getElementById('regenerate-btn').addEventListener('click',() => {
                        
                        console.log('regenerating');
                        this.sendAttempt(0);//automatically mark as false if choose to regenerate, or -1 ?
                        this.regenerateTester();
                        this.refreshTimer();
                        this.startTimer();
                    });

                    document.getElementById('window-regenerate-btn').addEventListener('click', () => {
                        document.getElementById('resultMessage').style.display = 'none';
                        this.regenerateTester();
                        this.refreshTimer();
                        this.startTimer();
                    });
                })
            },
    
            
    
            async runSubmit(studentCode, solution) {
                
                this.refreshOutput();
                const studentAnswer = await this.runCode(studentCode);
                // console.log("studentanswer", studentAnswer);
                console.log("running");
                // 显示输出结果
                document.getElementById('output').textContent = studentAnswer.output || studentAnswer.error;

                if (!studentAnswer.error) {
                    const solutionOutputString = solution.output.trim();
                    const studentOutputString = studentAnswer.output.trim();

                    if (solutionOutputString === studentOutputString) {
                        console.log("same");
                        document.getElementById('resultMessage').style.display = 'block'; // 显示弹窗
                        this.sendAttempt(1); // 提交正确的尝试
                    } else {
                        //  console.log("not same");
                        // console.log(solution.output);
                        // console.log(studentAnswer.output);
                        this.sendAttempt(0); // 提交错误的尝试
                    }
                } else {
                    console.log("Error occurred:", studentAnswer.error);
                    this.sendAttempt(0); // 提交错误的尝试
                }
                
            },
        }
      }
    </script>
    
    
    <style scoped>
    /* Overall Layout */
    
    html {
        height: 100%;
        
    }
    template, body {
        height: 100vh;
        margin: 0;
        padding: 0;
        display: flex;
    }
    
    /* #app {
      height: 100vh;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    } */
    
    body{
        /* height: 100vh; */
        /* flex-grow: 1; */
        background: transparent;
        display: flex;
        flex-direction: column;
    }

    /* 滚动条样式 */
    *:not(body)::-webkit-scrollbar {
        width: 8px; 
    }

    *:not(body)::-webkit-scrollbar-thumb {
        background-color: #5e766950; 
        border-radius: 10px; 
    }

    *:not(body)::-webkit-scrollbar-button {
        display: none; 
    }
    *:not(body)::-webkit-scrollbar-track {
        background: transparent; 
    }
    
    main {
        display: flex;
        justify-content: space-between;
        padding: 0; /* Remove padding */
        margin: 0; /* Remove margin */
        flex-grow: 1;
        flex-shrink: 1;
        flex-direction: row;
        position: relative;
        margin-top: 0;
        max-height: 88vh;
    }
    #top-panel{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        flex-shrink: 0;
        flex-grow: 0;
    }
    
    /* menu */
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
    .nav-links:not(#window-back-btn .nav-link){
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
    .nav-link:not(#window-back-btn .nav-link):hover {
      color: #156B3A;
    }
    
    /* 进度条容器 */
    #progress-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin: 0px auto;  /* 居中 */
        padding: 15px;
        background: linear-gradient(to top right, #6C8C81, #8E9D96);
        /* border-radius: 5px; */
        width: calc(100% - 30px);  /* 左右的间距 */
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        text-align: left;
        position: relative;
        height: auto;
    }
    /*#progress-percent {
        position: relative;
        top: 0;
        left: 0;
        color: #333;
        font-size: 15px;
        padding: 0;
        font-weight: bold;
        margin-bottom: 10px; /* 添加与进度条的间隔 
    }
    #progress-bar {
        width: 100%;
        height: 10px;
        background-color: #f0f0f0;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        margin-bottom: 5px; /* 添加与时间文本的间隔 
    }
    #progress {
        height: 100%;
        background-color: #F0A554; /* 设置进度条颜色 
        width: 0%; /* 初始宽度 
    }*/
    #time-elapsed {
        position: relative; /* Use absolute positioning */
        bottom: 0; /* Align to the bottom of the container */
        left: 0; /* Align to the left of the container */
        font-size: 16px;
        font-weight: 600;
        color: #fdffec;
        justify-content: center;
        margin: 0px auto;
        /* padding-left: 0; Add padding for spacing from left edge */
        /* padding-top: 5px; Add padding for spacing from bottom edge */
        /* margin-top: 1px; 添加与进度条的间隔 */
    }
    
    /* main body */
    /* 右边的结果和按钮区域 */
    /* 这两个中间再做一个分割线 */
    #right-panel {
        /*width: 60%;
        height: 80.8vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #f9f7eace;
        /* border-radius: 10px;
        padding: 20px; */
        /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
        /*margin-top: 0px;
        overflow: auto;*/
        width: 60%;
        /* flex-grow: 1; */
        /* height: auto; */
        /* max-height: 83vh; */
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #f9f7eace;
        /* border-radius: 10px;
        padding: 20px; */
        /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
        margin-top: 0px;
        overflow: hidden;
    }
    
    /* 顶部区域样式 */
    #right-top {
        padding: 0px;
        width: 100%;
        background-color: #C4D6BE;
        text-align: flex-start;
        height: 55%;
        display: flex;
        flex-direction: column; /* 确保内部的内容竖直排列 */
        justify-content: space-between; /* Push the button-group to the bottom */
        margin-top: 0; /* 移除不必要的顶部间距 */
        margin-bottom: 0; /* 确保和#sortable之间的间距 */
        min-height: 200px;
        /* scrollbar-gutter: stable; */
    }
    /* 如果需要在鼠标悬停时显示滚动条 */    
    /*#right-top:hover {
        overflow: auto;
        scrollbar-gutter: stable;
    }*/


    #sortable{
        height: 100%;
        padding: 0; /* 确保padding不会影响间距 */
        width: auto;
        /* overflow-y: auto;         */
        max-height: 80%;
        min-height: calc(75%); 
        font-size: 12px;
        background-color: #156b3a00;
        margin-top: 0;
    }

    #horizontal-divider {
        width: 100%;
        height: 5px;
        background-color: #c2f0d650; 
        cursor: ns-resize;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000000e5;
    }
    #horizontal-divider:hover {
        background-color: #156b3a80;
        height: 10px;
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
        border-top: none;
        border-bottom: none;
    }

    
    /* 底部区域样式 */
    /* #right-bottom {
        flex-grow: 1; 
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 0px;
        background-color: #f9f7eace;
        text-align: flex-start;
    } */
    
    #output i{
        font-size: 12px;
    }
    
    #output{
        /* overflow-y: auto; */
        /* padding-left: 5px; */
        font-weight: 550;
        overflow-y: auto;
        padding-left: 5px;
        white-space: pre-line;
        flex-shrink: 0;
    }
    
    #feedback{
        overflow-y: auto;
        padding-left: 5px;
        flex-shrink: 0;
    }
    /* CSS for the square display area */
    #calculated-value {
        /* width: auto;  
        height: auto; 
        padding: 5px;      
        background-color: #93841fce;
        text-align: flex-start;
        display: flex;
        align-items: flex-start; */
        width: 100%;
        /* height: auto; */
        flex-grow: 1; /* 占据剩余的垂直空间 */
        /* padding: 5px; */
        background-color: #f9f7eace;
        text-align: flex-start;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-sizing: border-box; /* 包括 padding 和 border 在元素总尺寸内 */
        font-size: 15px;
        overflow-y: auto;
        /* scrollbar-gutter: stable; */
    }
    /* #calculated-value:hover {
        overflow-y: auto;
        scrollbar-gutter: stable;
    } */
    
    /* 分割线 */
    #divider {
        width: 5px;
        height: 100%;
        background-color: #c2f0d650; 
        cursor: ew-resize;  /* 调整鼠标指针形状 */
        position: relative;
        text-align: center;
        top: 0;
        bottom: 0;
        z-index: 1;
        display: flex;                
        justify-content: center;       /* 水平居中 */
        align-items: center;           /* 垂直居中 */
        color: #6c8c8186;
    }
    
    #divider:hover{
        width: 10px;
        background-color: #156b3a80;
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);   /* 阴影变大 */
        /* display:flex; */
    }
    
    /* 左边的拖动区域 */
    #left-panel{
        width: 40%;
        /* height: auto; */
        display: flex;
        flex-direction: column; /* 垂直方向排列 */
        align-items: stretch;
        /* justify-content: flex-start; */
        background: #f4f2e2;
        margin-top: 0px;
        position: relative;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        overflow: visible;
    }   
    
    #left-content{
        width: 100%;
        display: flex;
        flex-direction: column;
        /* overflow:auto; */
        flex-shrink: 0;
        max-height: 40%;
        margin-bottom: 0;
    }

    #question-content{
        overflow-y: auto;
        max-height: calc(70%);
    }
    
    #topicdescription, #questiondescription, #expectedoutput{
        margin-left: 10px;
    }

    /* #questiondescription:hover {
        overflow-y: auto;
        scrollbar-gutter: stable;
    } */
    #sortableTrash {
        width: calc(100% - 20px);
        background: #13d4bd00;
        max-height: 50%;
        /* border: 1px solid #dcdcdc; */
        border-radius: 10px;
        /* padding: 20px; */
        /* box-shadow: 0 2px 8px rgba(131, 40, 40, 0.1); */
        flex-shrink: 0;
        overflow-y: auto;
        font-size: 12px;
        /* scrollbar-gutter: stable; */
    }
    /* 鼠标悬浮时显示滚动条 */
    /* #sortableTrash:hover {
        overflow: auto;
        scrollbar-gutter: stable;
    } */
    
    
    
    button i {
        font-size: 14px;
        padding-right: 5px;
    }
    
    #regenerate-btn button, #button-group button{
        width: 150px;
        background-color: #C4D2C1;  /* 渐变绿色按钮 */
        border: 2px solid #ffffff;
        border-radius: 50px;
        color: rgb(0, 0, 0);
        padding: 10px;
        font-size: 14px;
        font-weight: 800;
        border-radius: 17.5px;
        cursor: pointer;
        margin: 5px;
        box-shadow: inset 3px 3px 8px rgba(0, 0, 0, 0.3), inset -3px -3px 8px rgba(255, 255, 255, 0.1); /* Concave effect */
        transition: all 0.3s ease; /* Smooth transition */
    }
    
    /* 鼠标悬停时的效果 */
    #button-group button:hover {
        border:2px solid #e2b00e;
        transform: translateY(-3px);     /* 悬浮效果 */
        /*box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);   /* 阴影变大 */
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3), -3px -3px 8px rgba(255, 255, 255, 0.2); /* Convex effect */
    }
    #regenerate-btn{
        position: absolute;
        right: 5px;
        bottom: 2px;
    }
    
    #regenerate-btn button{
        border: none;
        border-radius: 5px;
        background: linear-gradient(to right, #d7b50d, #e9a004e2); 
        
    }
    #regenerate-btn button:hover{
        border:2px solid #e2b00e;
        transform: translateY(-1px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3), -3px -3px 8px rgba(255, 255, 255, 0.2); 
    }
    #button-group {
        display: flex;
        justify-content: center;
        gap: 20%;
        /* margin-top: 5px; */
        margin-bottom: 0; 
    }

    #button-group i {
        font-size: 14px;
    }

    #button-container {
        display: flex;
        flex-direction: row; 
        align-items: center;   
        text-align: center;
        justify-content: center;
        gap: 50px;              
    }
    #button-container button{
        padding: 3px;
        background-color: rgba(0, 255, 255, 0);
        border: 1px solid rgb(0, 0, 0);
        border-radius: 5px;
        margin: 10px;
        transition: all 0.3s ease;
        font-size: 14px;
        cursor: pointer;
        font-weight: 500;
    }
    #button-container button:hover{
        background-color: #dd8b33f4;
    }
    #resultMessage p{
        margin: 0;
        margin-top: 15px;
    }
    #window-back-btn .nav-link{
        text-decoration: none;
        /* color: #333333; */
        font-size: 18px;
        font-weight: 500;
    }
    #escape-btn{
        width: 25px;
        padding: 0%;
        margin: 0%;
        position: absolute;
        /* left: 15px; */
        right: 3px;
        top: 15px;
        background-color: transparent;
        border: none;
        display: inline-flex;
    }
    #escape-btn i{
        display: inline-block;
        transition: transform 0.5s ease;
        transform-origin: 30% 50%;
    }
    #escape-btn:hover i{
        transform: scale(2.0) rotate(360deg);
        /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); */
    }
    #resultMessage {
        height:10%;
        width: 40%;
        display: none; 
        position: fixed;
        flex-direction: column;
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        padding: 30px;
        background-color: rgb(224, 247, 216);
        border: 1px solid black;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index: 1000; 
        border-radius: 10px;
        text-align: center;
        align-self: center;
        font-size: 18px;
    }
    
    /* @media (max-width: 768px) {
        main {
            flex-direction: column;
            align-items: center;
        }
    
        #sortableTrash, #right-panel {
            width: 100%;
        }
    
        #button-group {
            flex-direction: column;
            align-items: center;
        }
    
        button {
            width: 95%;
        }
    } */
    @media (max-height: 768px){
        #button-group button i {
            font-size: 10px;
        }
        #button-group button{
            font-size: 12px;
            padding: 5px;
            margin-top: 5px;
            margin-bottom: 5px;
            font-weight: 700;
        }
    }
    @media (max-width: 896px) {
        .top{
            height: 40px;
        }
        /* 设置左侧和右侧面板垂直排列 */
        main {
            flex-direction: column;
            overflow-y: hidden;
        }
    
        /* 设置左侧面板和右侧面板的宽度为100% */
        #left-panel, #right-panel {
            width: auto;
        }
    
        /* 调整左侧和右侧面板的高度以适应小屏幕 */
        #left-panel {
            height: 52.5%;
            overflow: visible;
            z-index: 2;
        }
    
        #left-content{
            width: auto;
            height: 35.5%;
            display: block;
            /* flex-shrink: 0; */
        }
        #sortableTrash {
            height: 50%;
            margin-bottom: 45px;
        }
    
        /* 调整按钮宽度 */
        #regenerate-btn button {
            width: 100px;
            font-size: 14px;
            padding: 6px;
        }
    
        #right-panel {
            flex-grow: 1;
            z-index: 1;
            overflow-y: visible;
        }
    
        /* 减少字体大小和按钮的宽度 */
        h2, p {
            font-size: 14px;
        }
    
        button {
            width: 30%;
        }
        
        #button-group{
            justify-content: center;
        }
        #button-group button {
            width: 80px; 
            font-size: 12px;
            padding: 5px;
            margin-top: 15px;
        }
        
        /* 调整按钮内部的图标大小 */
        #button-group button i {
            font-size: 14px;
        }
        
        /* 隐藏或调整分割线 */
        #divider {
            display: none;
        }
    
        /* 调整进度条容器在小屏幕上的样式 */
        #progress-container {
            width: auto;
            margin: 5px 0;
            margin-top: 40px;
        }
    
        /* #progress-percent,
        #progress-bar {
            display: none;
        } */
    
        #time-elapsed {
            font-size: 12px;
            margin: 0 auto;
            text-align: center;
        }
        #resultMessage {
            font-size: 14px;
        }
        #button-container button {
            margin: 10px;
            font-size: 12px;      
            font-weight: 500;
            min-width: 70px;      
            white-space: nowrap;    
        }
        #escape-btn{

            /* left: 8px; */
            right: 0px;
            top: 10px;
        }
    }
    .finish-button{
        background-color: #156B3A;
    }

    #loading-overlay {
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center; 
        position: absolute; 
        top: 50%; 
        left: 50%;
        transform: translate(-50%, -50%); 
        z-index: 9999; 
    }

    .loading-icon {
        margin-bottom: 10px; 
    }
    </style>
