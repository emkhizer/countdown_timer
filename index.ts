#! /usr/bin/env node

import inquirer from "inquirer"; // inquirer library import kar raha hai jo interactive console prompts ke liye use hoti hai
import { differenceInSeconds } from "date-fns"; // date-fns library se differenceInSeconds function import kar raha hai jo do dates ke darmiyan seconds ka difference nikalta hai

const res = await inquirer.prompt({
  name: "userInput", // prompt ka naam "userInput" rakha hai
  type: "number", // input type number hai
  message: "Please enter the amount in second", // user ko yeh message dikhaya jata hai
  validate: (input) => { // input validation function
    if(isNaN(input)){ // agar input number nahi hai
        return "Please enter a valid number"; // error message return karega
    }else if(input > 60){ // agar input 60 se zyada hai
        return "Please enter a number less than 60"; // error message return karega
    }else {
        return true; // agar input valid hai to true return karega
    }
  }
});

let input = res.userInput; // userInput ko input variable mein store kar raha hai

function startTime(val: number) { // startTime function define kar raha hai jo number argument leta hai
  const intTime = new Date().setSeconds(new Date().getSeconds() + val); // current time mein user ka input add kar ke future time set kar raha hai
  const intervalTime = new Date(intTime); // future time ko intervalTime variable mein store kar raha hai
  setInterval(() => { // har second (1000 milliseconds) baad yeh function run karega
    const currentTime = new Date(); // current time ko currentTime variable mein store kar raha hai
    const timeDiff = differenceInSeconds(intervalTime, currentTime); // intervalTime aur currentTime ke darmiyan ka second difference nikal raha hai

    if (timeDiff <= 0) { // agar time difference 0 ya us se kam hai
      console.log("Timer has expired"); // "Timer has expired" message console mein print karega
      process.exit(); // process ko exit kar dega
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600); // remaining minutes calculate kar raha hai
    const sec = Math.floor(timeDiff % 60); // remaining seconds calculate kar raha hai
    console.log(`${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`); // remaining time ko MM:SS format mein print kar raha hai
  }, 1000);
}
startTime(input); // startTime function ko user input ke sath call kar raha hai
