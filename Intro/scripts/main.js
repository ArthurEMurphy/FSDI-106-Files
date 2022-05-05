function test() {
  console.log("Start Testing");

  let name = "Arthur Murphy";
  console.log("name");
  console.log(name);
}

function sayHi(name, lastName) {
  console.log("Hi " + name + " " + lastName);
}

function sum(num1, num2) {
  if (!num1) {
    // if numb1 does NOT exist
    console.log("Error: num1 cannot be empty");
    return; // STOP the exec
  }

  let result = num1 + num2;
  return result;

  //console.log("Never called"); // never exeuted because the return instruction ends the function.
}
function arrayTest() {
  let nums = [
    1, 3, 451, 123, 3456, 1234, 457, 967, 235, 235, 567, 2345, 1, 234, 567,
    6789,
  ];
  // get a value by index (position)
  console.log(nums[0]); // 0 = first

  // iterate over the array
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    console.log(num);
  }

  console.log("---------------------------------------------");
  //1: print numbers lower than 500
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    if (num < 500) {
      console.log(num);
    }
  }
  //2: print the numbers from 0 to 20
  for (let i = 0; i < 21; i++) {
    let num = nums[i];
    console.log(i);
  }
  //3: print the numbers from 1 to 20
  for (let i = 1; i < 21; i++) {
    let num = nums[i];
    console.log(i);
  }
  //4: print the numbers from 1 to 20 except 13
  for (let i = 1; i < 21; i++) {
    let num = nums[i];
    if (i != 13 && i != 7) {
      // if i is NOT equal to 13 and 7
      console.log(i);
    }
  }

  // 5: print the sum of all the numbers
  // create a var
  // for loop
  // get every number
  // add the number to the running total (var)
  // console.log the total
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    total = total + num;
  }
  console.log(total);
}

function init() {
  console.log("intro page");
  // hook events

  // load date
  test();
  // interact with the DOM element
  // console.log(name); // wont work as the name var is a local var in the other function...not defined in this function.
  sayHi("Joseph");
  sayHi("Rose");

  let myName = "Arthur";
  sayHi(myName, "Murphy");

  let result = sum(21, 21); // 42
  console.log(result);

  arrayTest();
}

// when the browser finish rendering the html
// execute init fn
window.onload = init;
