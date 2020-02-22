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
    Palindrome Checker
*/
function palindrome(str) {
  var out = true;
  let reg1 = /[A-Za-z0-9]/g;
  str = str.toLowerCase().match(reg1);  

  for (let i = 0 ; i < str.length ; i++) {
    if (str[i] != str[(str.length - (i+1))]) {
      out = false;
    }
  }

  return (out) ? true : false ;  
}

palindrome("1 eye for of 1 eye.")


/* ------------------------------------------------- 
    Roman Numeral Converter
*/
function convertToRoman(num) {

  let str = "";

  while (num >= 0) {
    if (num >= 1000) {
      str += "M";
      num -= 1000;
      continue;
    }
    if (num >= 900) {
      str += "CM";
      num -= 900;
      continue;
    }
    if (num >= 500) {
      str += "D";
      num -= 500;
      continue;
    }
    if (num >= 400) {
      str += "CD";
      num -= 400;
      continue;
    }
    if (num >= 100) {
      str += "C";
      num -= 100;
      continue;
    }
    if (num >= 90) {
      str += "XC";
      num -= 90;
      continue;
    }
    if (num >= 50) {
      str += "L";
      num -= 50;
      continue;
    }
    if (num >= 40) {
      str += "XL";
      num -= 40;
      continue;
    }
    if (num >= 10) {
      str += "X";
      num -= 10;
      continue;
    }
    if (num >= 9) {
      str += "IX";
      num -= 9;
      continue;
    }
    if (num >= 5) {
      str += "V";
      num -= 5;
      continue;
    }
    if (num >= 4) {
      str += "IV";
      num -= 4;
      continue;
    }
    if (num >= 1) {
      str += "I";
      num -= 1;
      continue;
    }
  }


  console.log(num);
  console.log(str);
  console.log(""); 

 return str;
}

convertToRoman(649)


/* ------------------------------------------------- 
    Caesars Cipher
*/
function rot13(str) {
  
  var alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","A","B","C","D","E","F","G","H","I","J","K","L","M"];
  let outstr = "";
  let reg = /\W/;

  for (let i in str) {
      if (reg.test(str[i])) {
           outstr += str[i];
      } else {
          outstr += alpha[13+alpha.indexOf(str[i])];
      }
  }

  console.log(outstr);

  return outstr;
}

rot13("SERR CVMMN!")

/* ------------------------------------------------- 
    Telephone Number Validator
*/
function telephoneCheck(str) {

  let reg = /\d/g;
  let num = str.match(reg);

  console.log(num);

  if (num.length >= 11 && num[0] != "1" || num.length < 10) {
    console.log(false);
    return false;
  }

  if (str.includes(")") && !str.includes("(") || str[(str.length-1)] == ")" || str[0] == "-") {
    console.log(false);
    return false;
  }

  if (num.length >= 12 || str.includes("?") || str.includes("(") && !str.includes(")")) {
    console.log(false);
    return false; 
  }

  console.log(str);

  return true;
}

telephoneCheck("(555-555-5555")


/* ------------------------------------------------- 
    Reverse words in a sentence
*/
function reverseWords(str) {
  
  const regexWordCharacter = /\w/;
  const regexPunctuation = /[,.'?!]/;
  
  let revStr = "";
  let word = "";
  
  for (let i = 0 ; i <= str.length-1 ; i++) {
    console.log(str[i])
    if(i == str.length-1) {
      revStr = word + str[i] + " " + revStr;
    } else if(regexWordCharacter.test(str[i])) {
      word += str[i];
    } else if (regexPunctuation.test(str[i])) {
      word += str[i];
    } else {
      revStr = word + str[i] + revStr;
      //console.log(word)
      word = "";
    }
  }
  
  console.log(str);
  console.log(revStr)
  // Output : "name? you're What's B. Bobby is name my mister, Hello "
  
  return revStr;
}

reverseWords("Hello mister, my name is Bobby B. What's you're name?");


/* ------------------------------------------------- 
    Sorting: Insertion
*/
function insertionSort(arr) {
  // Check if arr length is more than just 1.
  if(arr.length < 2){
    return arr;
  }
  
  for(let counter = 1 ; counter < arr.length ; counter++) {
    let greenLight = true;
    let index = counter;
    
    while(index >= 1 && greenLight) {
      // if behind index is bigger than current index
      if(arr[index - 1] > arr[index]) {
        // Destructure. Change places in this case.
        [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
        index--;
      } else {
        greenLight = false;
      }
    }
    
  }
  
  // If you want don't want mutate original arr.
  // begin with: mutatableArr = [...arr];
  // return mutatableArr;
}

// Output/Mutate array : Array values in ascending order.

/* ------------------------------------------------- 
    Sorting: Selection
*/
function selectionSort(arr) {
  // Check if arr length is more than just 1.
  if(arr.length < 2){
    return arr;
  }

  for(let position = 0 ; position < arr.length ; position++) {
    
    let minIndex = position;
    let counter = minIndex + 1;

    for(let index = counter ; index < arr.length ; index++) {
      // Finds the index of the smallest number. The minimum index.
      if(arr[minIndex] > arr[index]) {
        minIndex = index;
      }
    }
    
    // Destructure. Change places in this case. Puts minIndex at the  current position index.
    [arr[minIndex], arr[position]] = [arr[position], arr[minIndex]];
  }
  
  // If you want don't want mutate original arr.
  // begin with: mutatableArr = [...arr];
  // return mutatableArr;
}

// Output/Mutate array : Array values in ascending order.

/* ------------------------------------------------- 
    Sorting: Bubble
*/
function bubbleSort(arr) {
  
  for(let i =1 ; i < arr.length ; i++) {
    
    for(let index = 0 ; index < arr.length -1 ; index++) {

      if(arr[index] > arr[index+1]) {
        [arr[index], arr[index+1]] = [arr[index+1], arr[index]];
      }
    }
    
  }

  
  // If you want don't want mutate original arr.
  // begin with: mutatableArr = [...arr];
  // return mutatableArr;
}

// Output/Mutate array : Array values in ascending order.

/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/



/* ------------------------------------------------- 
    
*/





