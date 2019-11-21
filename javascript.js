// Algorithms I've done and saved for no apparent reason.
//
//

/* -------------------------------------------------
    Move all zeroes to end of array
*/
let arr = [0,0,0,1,2,0,0,3,5];

console.log(arr);
//Output: [0, 0, 0, 1, 2, 0, 0, 3, 5]

for (let i = arr.length; i >= 0 ; i--) {
  if(arr[i] === 0) {
    arr[arr.length] = 0;
    arr.splice(i, 1);
    i++;
    }
}

console.log(arr);
//Output: [1, 2, 3, 5, 0, 0, 0, 0, 0]


/* -------------------------------------------------
    Check for balanced parentheses in an expression
*/
//{}()[]
let stringBalanced = "if(test){arr.push[1];arr2.push[2]} else {console.log(false)}";
let stringNotBalanced = "if(test{arr.push[1];arr2.push[2]} else console.log(false{)}";

function checkParentheses(string) {
  let arr = [];
  let rounded = 0;
  let curly = 0;
  let squared = 0;
  let type = [];
  let balance = true;
  
  let regex = /[()\[\]{}]/g;
  let check = string.match(regex);
  
  //console.log(check);
  
  check.forEach((item, idx) => {
    //console.log(item + " - " + arr);
    //console.log(type + " - " + rounded + " " + curly + " " + squared)
    switch(item) {
      case "(":
        arr.push("(");
        rounded++;
        type.push("rounded");
        break;
      case ")":
        if(type[type.length-1] == "rounded" && rounded > 0) {
          arr.pop();
          type.pop();
          rounded--;
        } else {
          balance = false;
        }
        break;
      case "{":
        arr.push("{");
        curly++;
        type.push("curly");
        break;
      case "}":
        if(type[type.length-1] === "curly" && curly > 0) {
          arr.pop();
          type.pop();
          curly--;
        } else {
          balance = false;
        }
        break;
      case "[":
        arr.push("[");
        squared++;
        type.push("squared");
        break;
      case "]":
        if(type[type.length-1] === "squared" && squared > 0) {
          arr.pop();
          type.pop();
          squared--;
        } else {
          balance = false;
        }
        break;
      default:
        break;
    }
    //console.log("----");
  });
  
  if (arr.length > 0) {
    balance = false;
  }
  
  return balance;
}

console.log(checkParentheses(stringBalanced));
//Output: true
console.log(checkParentheses(stringNotBalanced));
//Output: false



/* -------------------------------------------------
    Sort array with small, medium and large in order
*/
let arr = ["s","m","l","s","m","l","s","m","l","s","m","l","s","m","l"];
console.log(arr);
//Output: ["s", "m", "l", "s", "m", "l", "s", "m", "l", "s", "m", "l", "s", "m", "l"]

for (let i = 0, stop = arr.length; stop > 0; i++, stop--) {
  console.log(arr[i]);
  if (arr[i] == "s") {
    arr.unshift(arr[i]);
    arr.splice(i+1,1);
  }
  
  if (arr[i] == "l") {
    arr.push(arr[i]);
    arr.splice(i,1);
    i--;
  }

}

console.log(arr);
//Output: ["s", "s", "s", "s", "s", "m", "m", "m", "m", "m", "l", "l", "l", "l", "l"]



/* -------------------------------------------------
    Sort array with types together in order they first arrive***
*/
let arr = ["s","m","u","l","s","m","b","l","s","u","u","m","u","b","m","l","s","b","m","l"];
console.log(arr);
//Output: ["s", "m", "u", "l", "s", "m", "b", "l", "s", "u", "u", "m", "u", "b", "m", "l", "s", "b", "m", "l"]

let types = [];
arr.forEach(item => {
  if(!types.includes(item)) {
    types.push(item);
  }
});
//console.log(types);
//bad, iterates each time for each type
//use something like save typesOrderIndex[["s","m","l","u","b"],[0,1,2,3,4],[4,5,4,4,3]]
//array with the types and order they should be in and then the last lastIndexOf that type. So we know where to put the next type.

for (let j = 0 ; j < types.length ; j++) {

  let type = types[j];
  
  for (let i = 0, stop = arr.length ; stop > 0 ; i++, stop--) {

    if (arr[i] == type) {
      arr.push(arr[i]);
      arr.splice(i,1);
      i--;
    }
  }
}

console.log(arr);
//Output: ["s", "s", "s", "s", "m", "m", "m", "m", "m", "u", "u", "u", "u", "l", "l", "l", "l", "b", "b", "b"]


/* -------------------------------------------------
    Sort array with numbers in order
*/
let arrPos = [11,5,9,1,8,12,3,2,21,35,16,100,54,0];
let arr = [11,5,9,1,8,12,3,2,-2,-35,-16,-100,-54,0];

console.log(arr);
// arrPos Output: [11, 5, 9, 1, 8, 12, 3, 2, 21, 35, 16, 100, 54, 0]
// arr Output: [11, 5, 9, 1, 8, 12, 3, 2, -2, -35, -16, -100, -54, 0]

// this is to find max number if there are negative numbers present 
if(Math.abs(Math.min(...arr)) > Math.max(...arr)) {
  var maxNumber = Math.abs(Math.min(...arr));
} else {
  var maxNumber = Math.max(...arr);
}

for (let i = 0; i <= maxNumber; i++) {

  if(arr.indexOf(i) > -1) {
    arr.push(arr[arr.indexOf(i)]);
    arr.splice(arr.indexOf(i), 1);
    // below is for negative numbers
  } else if (arr.indexOf(-Math.abs(i)) != -1) {
    let minusIndexPlusOne = arr.indexOf(-Math.abs(i))+1;
    arr.unshift(arr[arr.indexOf(-Math.abs(i))]);
    arr.splice(minusIndexPlusOne, 1);
  }

}

console.log(arr);
// arrPos Output: [0, 1, 2, 3, 5, 8, 9, 11, 12, 16, 21, 35, 54, 100]
// arr Output: [-100, -54, -35, -16, -2, 0, 1, 2, 3, 5, 8, 9, 11, 12]



/* -------------------------------------------------
    Reverse a string
*/
let string = "this is a test";
let reverseString = "";
console.log(string);
// Output : "this is a test"

for (let i = string.length - 1 ; i >= 0 ; i--) {
  reverseString += string[i];
}

console.log(reverseString);
// Output : "tset a si siht"

let oneString = "this is only using one string.";
console.log(oneString);
// Output : "this is only using one string."

for (let i = oneString.length -1 ; i >= 0 ; i--) {
  oneString += oneString[i];
}
oneString = oneString.substring(oneString.length / 2);

console.log(oneString);
// Output : ".gnirts eno gnisu ylno si siht"


/* ------------------------------------------------- 
    FizzBuzz: Print 1 to 100 with multiples of 3 print Fizz and multiples of 5 print buzz instead of number. If both multiples of 3 & 5 print FizzBuzz
*/
for (let i = 1 ; i <= 100 ; i++) {
  
  let out = "";
  
  if(i % 3 == 0) {
    out += "Fizz";
  }
  if(i % 5 == 0) {
    out += "Buzz";
  }
  
  if(out !== "") {
    console.log(out);
  } else {
    console.log(i)
  }
}
// Output to line 15: 1|2|"Fizz"|4|"Buzz"|"Fizz"|7|8|"Fizz"|"Buzz"|11|"Fizz"|13|14|"FizzBuzz"|


/* ------------------------------------------------- 
    
*/


