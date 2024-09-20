
/*---------------------------CREATING TASKS FOR GEMINI IN THE DATAFRAME TOPIC------------------------*/
let createDF = [];
createDF.push(" create 3 Pandas series and use them to create a Pandas DataFrame.\n");
createDF.push(" create 3 Pandas DataFrames and join them using concat.\n");
createDF.push(" create 3 Pandas DataFrames and join them using join.\n");
createDF.push(" create 3 Pandas DataFrames and join them using merge.\n");
createDF.push(" create a Python dictionary and use it to create a Pandas DataFrame.\n");

let taskDFSort = [];
taskDFSort.push(" sort the DataFrame over multiple columns in ascending order.\n"); 
taskDFSort.push(" sort the DataFrame over multiple columns in descending order.\n"); 

let taskDFGroupby = [];
taskDFGroupby.push(" use groupby and sum on the original DataFrame, and print the grouped DataFrame.\n");
taskDFGroupby.push(" use groupby and count on the original DataFrame, and print the grouped DataFrame.\n");
taskDFGroupby.push(" use groupby and mean on the original DataFrame, and print the grouped DataFrame.\n");
taskDFGroupby.push(" use groupby and median on the original DataFrame, and print the grouped DataFrame.\n");
taskDFGroupby.push(" use groupby and mode on the original DataFrame, and print the grouped DataFrame.\n");
taskDFGroupby.push(" use groupby and agg on the original DataFrame, and print the grouped DataFrame.\n");

let taskDFJoin = [];
taskDFJoin.push(" create a new DataFrame, and perform a left join on it and the original DataFrame using keys from the original DataFrame, then print the resulting DataFrame.\n");
taskDFJoin.push(" create a new DataFrame and perform a join on it and the original DataFrame along rows and assign all data, then print the resulting DataFrame.\n");
taskDFJoin.push(" create a new DataFrame and perform a merge on it and the original DataFrame along their common column id, then print the resulting DataFrame.\n");
taskDFJoin.push(" create a new DataFrame and perform a join on it and the original DataFrame with matching records on both sides where available, then print the resulting DataFrame.\n");
taskDFJoin.push(" create a new DataFrame and perform a merge on it and the original DataFrame using multple join keys, then print the resulting DataFrame.\n");

let taskDFRegex = [];
taskDFRegex.push(" capitalize all string values of a column in the original DataFrame using regular expression.\n");
taskDFRegex.push(" count the number of occurrence of a specified substring in a column in the original DataFrame using regular expression.\n");
taskDFRegex.push(" remove all HTML tags in a column in the original DataFrame using regular expression.\n");
taskDFRegex.push(" extract date from a column in the original DataFrame using regular expression.\n");

let taskDFMissing = [];
taskDFMissing.push(" count the number of missing values in each column of the original DataFrame.\n");
taskDFMissing.push(" replace null values of the original DataFrame with a single constant value.\n");
taskDFMissing.push(" replace null values of the original DataFrame with a value from the previous or next row.\n");
taskDFMissing.push(" replace null values of the original DataFrame with the mean value of the column.\n");
taskDFMissing.push(" replace null values of the original DataFrame with the median value of the column.\n");

let taskDFSlicing = [];
taskDFSlicing.push(" select the first three rows from the original DataFrame using iloc.\n");
taskDFSlicing.push(" select rows from the original DataFrame based on a condition using loc.\n");
taskDFSlicing.push(" set values the original DataFrame using loc.\n");
taskDFSlicing.push(" slice the original DataFrame based on rows and columns labels using loc.\n");

let tasksDF = new Map();

tasksDF.set(0, taskDFSort);
tasksDF.set(1, taskDFGroupby);
tasksDF.set(2, taskDFJoin);
tasksDF.set(3, taskDFRegex);
tasksDF.set(4, taskDFMissing);
tasksDF.set(5, taskDFSlicing);
/*---------------------------------------------------------------------------------------------------*/

export function promptDataFrame() {
  let taskOne = Math.floor(Math.random() * tasksDF.size);
  let taskTwo = Math.floor(Math.random() * tasksDF.size);
  let taskThree = taskOne;
  while (taskThree == taskTwo || taskThree == taskOne) {
    taskThree = Math.floor(Math.random() * tasksDF.size);
  }
  let str = "";
  str += "- It should";
  str += createDF[Math.floor(Math.random() * createDF.length)];
  let taskOneArr = tasksDF.get(taskOne);
  let taskTwoArr = tasksDF.get(taskTwo);
  let taskThreeArr = tasksDF.get(taskThree);
  console.log(taskOne);
  console.log(taskTwo);
  console.log(taskThree);
  str += "- It should then";
  str += taskOneArr[Math.floor(Math.random() * taskOneArr.length)];
  str += "- It should then";
  str += taskTwoArr[Math.floor(Math.random() * taskTwoArr.length)];
  str += "- It should then";
  str += taskThreeArr[Math.floor(Math.random() * taskThreeArr.length)];
  return str;
}

