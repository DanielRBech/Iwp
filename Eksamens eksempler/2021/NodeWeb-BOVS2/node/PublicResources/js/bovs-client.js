'use strict'
//SEE: https://javascript.info/strict-mode

function jsonParse(response){
  if(response.ok) 
     if(response.headers.get("Content-Type") === "application/json") 
       return response.json();
     else throw new Error("Wrong Content Type");   
 else 
    throw new Error("Non HTTP OK response");
}

function jsonFetch(url){
  return  fetch(url).then(jsonParse);
}


function jsonPost(url = '', data={}){
  const options={
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
    };
  return fetch(url,options).then(jsonParse);
}


console.log("JS er klar!");



function extractBeerEvalData(){
  let beerEvalData={};
  beerEvalData.evaluatorName=document.getElementById("name_id").value;
  beerEvalData.beerName= document.getElementById("beers_menu_id").value;
  beerEvalData.score=Number(document.getElementById("score_id").value);
  console.log("Extracted"); console.log(beerEvalData);
  return beerEvalData;
}

function sendEvalData(event) {
  event.preventDefault(); //we handle the interaction with the server rather than browsers form submission
  document.getElementById("evaluateBtn_id").disabled=true; //prevent double submission
  let drinkData=extractBeerEvalData();

  jsonPost(document.getElementById("beerEvalForm_id").action,drinkData).then(evalStatus=>{
    console.log("Status="); console.log(evalStatus); //expect an date object. 
    document.getElementById("evaluateBtn_id").disabled=false;
  }).catch(e=>console.log("Ooops "+e.message));
}


document.getElementById("beerEvalForm_id").addEventListener("submit", sendEvalData);

