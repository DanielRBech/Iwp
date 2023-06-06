'use strict'
//SEE: https://javascript.info/strict-mode

console.log("JS er klar!");
let logNo=1;
function sepLog(text=""){
    console.log("--------Exercise " + logNo + " " + text+ "-----------------");
  logNo++;
  }
let diceRoll=[1,6,6,2,3,4,6];

sepLog("V1: no func parameters");
/*
Write a function get6s_v1 that takes an array of numbers (dice values 1..6) as parameter, and prints the indexes and corresponding values,
 of the array elements are 6s 1:6, 2:6, 6:6 ..." excluding other elements. At this stage, just write a basic version, eg. without function paramters
Appply the funtion to the above array arr as argument.
*/

function get6s_v1(dice){
    for(let i=0;i<dice.length;i++)
     if(dice[i]===6) 
        console.log(i+":"+dice[i]);
}

get6s_v1(diceRoll);

sepLog("V2: no func parameter, but helper to compare");
/*
  Write a helper function eg "is6(v)" that can test if the supplied parameter value v is a 6 
  Rewrite get6s_v1 to get6_v2 such that it uses the helper function to test if the index/value should be printed.  
  Appply the funtion to the above array arr.  
*/

function is6(d){
   if(d===6) return true;
   else return false;
}

//or simply
function is6_v2(d){
  return (d===6);
}

function get6s_v2(dice){
    for(let i=0;i<dice.length;i++)
     if(is6(dice[i])) 
        console.log(i+" "+dice[i]);
}
get6s_v2(diceRoll);

sepLog("V3 compare function parameter");
/*
  Now create a get6s_v3 that rewrites get6_v2 to accept a dice array as first parameter, and a "compare" function as second parameter.
  Apply the function using the diceRoll and function "is6" as actual arguments
*/
function get6s_v3(dice,compare){
    for(let i=0;i<dice.length;i++)
     if(compare(dice[i])) 
        console.log(i+" "+dice[i]);
}
get6s_v3(diceRoll,is6);



sepLog("V4: compare function as inlined parameter");


/*
Copy and rename the get6s_v3 function to findDices_v1(dice,compare). Call it with the same arguments as above using the diceRoll and function "is6"
Then call it using a function expression (named or anonymous) at the call site, to pass a function that selects 1 dices. 
*/
function findDices_v1(dice,compare){
  for(let i=0;i<dice.length;i++)
   if(compare(dice[i])) 
      console.log(i+" "+dice[i]);
}
console.log("6s");
findDices_v1(diceRoll,is6);
console.log("1s: anonymous function");
findDices_v1(diceRoll,function (d){return (d===1)});
console.log("1s: named function");
findDices_v1(diceRoll,function is1(d){return (d===1)});


sepLog("V5: using a lambda expression");
/*
Then call it using ta lambda expession to pass a function that selects dices with values <= 3. 
*/

findDices_v1(diceRoll,d=>(d<=3));


sepLog("V6a: return an array; using for-of and array method forEach");
//illustrates how filter works!
/*
  Now based on findDices_v1 create a version 2 such that it returns an array of the found element instead of printing them to the log. 
  print the output (array) when applied to diceRoll, is6. Use the array method forEach to iterate over all dice of the diceRoll, or use for-of.  
  Hint: make an variable holding an empty array and use the push method on that to insert the found elements. 
*/

function findDices_v2(dice,compare){
    let result=[];
    for(let d of dice)
     if(compare(d)) 
        result.push(d);
    return result;
}
console.log(findDices_v2(diceRoll,is6));

function findDices_v3(dice,compare){
  let result=[];
  dice.forEach( d => { 
   if(compare(d)) 
      result.push(d);
  });
  return result;
}
console.log(findDices_v3(diceRoll,is6));

sepLog("V6b: compare to array method filter");
/*
  Consider the following statement "console.log(diceRoll.filter(is6));" and compare that with the code you have written in the function exercise
  Any similarities?
*/
//Uses the builtin filter method that, given a function "pred", iterates the array and produces a new array with elements where "pred" is true
console.log(diceRoll.filter(is6));
//uses the reduce method to iteratively compute the sum of 6-dice. Reduce calls the reducer-function for each element: Reducer(Reducer(Reducer(0,6),6),6) = 18 
console.log(diceRoll.filter(dice=>dice==6).reduce((sum,dice)=>sum+dice,0));

//sepLog();
sepLog("V7: closures");

/* make a compare function factory "makeIsN(diceN)" that returns a function that compares its parameter value v.
  us it to create a functio is1 that checks if a dices has value 1. 
*/

function makeIsN(diceN){
  let isN=function(d){
    return (d===diceN);
  }
  return isN;
}
let is1=makeIsN(1);

findDices_v1(diceRoll,is1);


