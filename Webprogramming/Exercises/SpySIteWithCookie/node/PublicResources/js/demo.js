'use strict'
//SEE: https://javascript.info/strict-mode


async function post_data(data) {
  let response = await fetch('http://127.0.0.1:3000/spy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: data
  });

  if(response.ok) {
    let body = await response.json();
    return("server answered: " + JSON.stringify(body));
  } else {
    throw new Error("HTTP-Error: " + response.status)
  }
}


function sendSpyData(ev) {
	post_data(JSON.stringify(ev.currentTarget.id))
	.then(console.log).catch(console.log);
}


for (let el of document.querySelectorAll("div, img, a")) {
	el.addEventListener("mouseover", sendSpyData);
}

function setCookie(name, value, daysToLive) {
  let cookie = `${name}=${encodeURIComponent(value)}`;
  cookie += `;max-age=${daysToLive*60*60*24}`;
  document.cookie = cookie;
}

function getCookies() {
	let cookies = new Map(); // The object we will return
	let all = document.cookie; // Get all cookies in one big string
	let list = all.split("; "); // Split into individual name/value pairs
	for(let cookie of list) { // For each cookie in that list
		if (!cookie.includes("=")) continue; // Skip if there is no = sign
		let p = cookie.indexOf("="); // Find the first = sign
		let name = cookie.substring(0, p); // Get cookie name
		let value = cookie.substring(p+1); // Get cookie value
		value = decodeURIComponent(value); // Decode the value
		cookies.set(name, value); // Remember cookie name and value
	}
	return cookies;
}

let cookies = getCookies();
if (!cookies.get('pageVisit')) {
	console.log("first time here");
	setCookie("pageVisit", 1, 1);
} else {
	console.log("you visited this page " + cookies.get('pageVisit') + " times");
	setCookie("pageVisit", Number(cookies.get('pageVisit')) + 1, 1);
}
console.log("now the cookie is " + JSON.stringify(document.cookie));
