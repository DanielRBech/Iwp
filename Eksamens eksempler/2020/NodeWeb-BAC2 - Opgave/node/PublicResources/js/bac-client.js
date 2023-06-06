'use strict'
//SEE: https://javascript.info/strict-mode


function showDate(data){
  let p=document.getElementById("id1");
  let d=document.createElement("pre");
  d.textContent=String("Fetched date object: "+data);
  p.parentElement.append(d);
 
}


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
//console.log(jsonFetch("/bac-records"));

function extractDrinkData(){
  let bacDrinkData={};
  bacDrinkData.name=document.getElementById("name_id").value;

  console.log("Extracted"); console.log(bacDrinkData);
  return bacDrinkData;
}

function sendDrink(event) {
  event.preventDefault(); //we handle the interaction with the server rather than browsers form submission
  document.getElementById("drinkBtn_id").disabled=true; //prevent double submission
  let drinkData=extractDrinkData();


  jsonPost(document.getElementById("bacDrinkForm").action,drinkData).then(drinkStatus=>{
    console.log("Status="); console.log(drinkStatus); //expect an empty object. 
    document.getElementById("drinkBtn_id").disabled=false;
  }).catch(e=>console.log("Ooops "+e.message));
}

document.getElementById("bacDrinkForm").addEventListener("submit", sendDrink);