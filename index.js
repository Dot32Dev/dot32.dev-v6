const md = new Remarkable({
	html: true
});

let cache = {}

let xhr = new XMLHttpRequest();
xhr.open("GET", detectPageFromURL());
console.log(detectPageFromURL())
xhr.onload = function()
{
  let text = xhr.responseText;
  // console.log(text);
  if (text.includes("<!doctype html>") && text.includes(`<script src="https://kit.fontawesome.com/c0fe0ca982.js" crossorigin="anonymous"></script>`)) {
  	text = '# 404'
  }
  document.getElementsByTagName("main").item(0).innerHTML = md.render(text);
  hljs.highlightAll()
  twemoji.parse(document.body, {folder: 'svg', ext: '.svg'})

  getPageData()
}
xhr.send();

function setContent(name) {
	xhr.open("GET", "/" + name + ".md");
	xhr.send();
	window.history.pushState(name, `Dot32`, '/'+name);
	// document.title =  `Dot32 | ${name.replace('.md', '')}`
}

window.onpopstate = function(event) {
	// console.log(detectPageFromURL())
	// xhr.open("GET", detectPageFromURL());
	// xhr.send();
	xhr.open("GET", "/" + event.state + ".md");
	xhr.send();
}

function detectPageFromURL() {
	let page = window.location.pathname.replace('index.html','').replace('.html','')
	if (page.charAt(page.length-1) === "/") {
		console.log("removing slash to " + page)
		page.slice(0, -1);
	}
	page = page + ".md"
	if (page === "/.md") {
		page = "dot32.md"
	}
	page = page.replace('/.md','.md')

	// let title = page.replace('.md', '')
	// title = title.substring(1)
	// title = "Dot32 | " + title
	// document.title = title

	console.log(page)
	return page
}

function getPageData() {
	try {
	  var data = JSON.parse(document.getElementById("json").innerHTML)
	}
	catch(err) {
	  var data = JSON.parse("{}")
	  console.log(err)
	}
	
	console.log(data)

	if (data.archived) {
		document.getElementById("alert").style.display = "block"
		document.getElementById("alert").innerHTML = "<h3>This page is archived, and may be out of date/hard to understand</h3>"
	} else {
		document.getElementById("alert").style.display = "none"
	}

	if (data.author && data.date) {
		document.getElementById("datetime").style.display = "block"
		document.getElementById("datetime").innerHTML = `Written ${data.date} by ${data.author}`
	} else if (data.author) {
		document.getElementById("datetime").style.display = "block"
		document.getElementById("datetime").innerHTML = `Written by ${data.author}`
	} else if (data.date) {
		document.getElementById("datetime").style.display = "block"
		document.getElementById("datetime").innerHTML = `Written ${data.date}`
	} else {
		document.getElementById("datetime").style.display = "none"
	}

	if (data.title) {
		document.title = data.title
		let cardTitle = `${data.title} - Dot32 dev`.replace('Dot32 dev - ', '')
		document.querySelector('meta[property="og:title"]').setAttribute("content", cardTitle);
		console.log(cardTitle)
	} else {
		document.title = `Dot32 | ${detectPageFromURL().replace('.md', '').replace('/', '')}`
	}

	if (data.description) {
		document.querySelector('meta[name="description"]').setAttribute("content", data.description);
		document.querySelector('meta[property="og:description"]').setAttribute("content", data.description);
		console.log(data.description)
	}

	if (data.image) {
		document.querySelector('meta[property="og:image"]').setAttribute("content", `https://dot32.netlify.app${data.image}`);
		console.log(`https://dot32.netlify.app${data.image}`)
	}

	contentsList()
}

function contentsList() {
	let list = document.getElementById("contents-ul")
	list.innerHTML = ""
	var titles = document.querySelectorAll("main h1, main h2");
	for (let i = 0; i < titles.length; i++) {
		let li = document.createElement("li")
		let a = document.createElement("a")
		let id = titles[i].innerHTML.replaceAll(' ', '-')
  	a.innerHTML = titles[i].innerHTML
  	a.href = "#"+id
  	let page = detectPageFromURL()
  	window.history.pushState(page, `Dot32`, '/'+page+"#"+id);
  	// a.setAttribute('onclick',`document.getElementById(${id}).scrollIntoView({behavior: 'smooth'}); return false`)
  	a.onclick = function(){
  		document.getElementById(id).scrollIntoView({behavior: 'smooth'}); 
  		return false
  	}
  	li.appendChild(a)
  	list.appendChild(li)
  	console.log(titles[i].innerHTML)

  	titles[i].id = id
  	console.log(id)
	}
}