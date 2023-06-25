const md = new Remarkable({
	html: true
});

// let cache = []
let currentPage = detectPageFromURL()
let loadedPages = []
let pages = ["/dot32.md", "/projects.md", "/tutorials.md"];
let lastPage = ""

async function getPage(page) {
	console.log("Scanning cache for " + page)
	for (var i = 0; i < loadedPages.length; i++) {
    console.log(`- ${loadedPages[i].name}`);

    if (page == loadedPages[i].name) {
    	console.log(`Found page ${page}`)

    	if (document.startViewTransition) {
    		let newPage = pages.indexOf(loadedPages[i].name)
  			let oldPage = pages.indexOf(lastPage)
  			console.log("old" + oldPage)
  			console.log("new" + newPage)
  			if (newPage < oldPage) {
  				document.documentElement.classList.add('back-transition');
  				console.log('back-transition')
  			}
    		const transition = document.startViewTransition(() => {
	    		document.querySelector("main").innerHTML = loadedPages[i].text
    			getPageData()
    		})
    		try {
					await transition.finished;
				} finally {
					document.documentElement.classList.remove('back-transition');
				}
    	} else {
    		document.querySelector("main").innerHTML = loadedPages[i].text
    		getPageData()
    	}

    	hljs.highlightAll()
    	twemoji.parse(document.body, {folder: 'svg', ext: '.svg'})
    	findNewLinks()

    	return

    }
	}
	console.log("Page not found in cache")
	if (page.startsWith("/")) {
		loadFile(page.replace(".md", "/index.md"))
	} else {
		loadFile("/" + page.replace(".md", "/index.md"))
	}
} 

function loadFile(url, shouldNotLoadPage) {
	fetch(url)
		.then(response => response.text())
		.then(text => {
		  if (text.includes(`<meta property="og:title" content="Dot32 dev" />`)) {
		  	if (!url.includes("/index.md")) {
		  		console.log(`Could not find ${url} or ${url.replace(".md", "/index.md")}`)
		  		text = "# 404 page not found \n[back to home page](/dot32)"
		  	} else {
		  		console.log(`Could not find ${url}, trying ${url.replace("/index.md", ".md")}`)
		  		loadFile(url.replace("/index.md", ".md"))
		  		return false
		  	} 
		  }
		  // console.log(`Loaded ${url}`)
		  // document.querySelector("main").innerHTML = md.render(text);
		  // hljs.highlightAll()
		  // twemoji.parse(document.body, {folder: 'svg', ext: '.svg'})

		  // getPageData()
		  console.log("Downloaded " + url + ", added to cache as " + url.replace("/index.md", ".md"))
		  loadedPages.push({name: url.replace("/index.md", ".md"), text: md.render(text)})

		  if (!shouldNotLoadPage) {
		  	getPage(url.replace("/index.md", ".md"))
		  }

		});
	console.log(`Requesting ${url}`)
}
// loadFile(currentPage.replace(".md", "/index.md"))
// getPage(currentPage.replace(".md", "/index.md"))
getPage(currentPage)

function setContent(name) {
	window.history.pushState(name, `Dot32`, '/'+name);
	console.log("--------")
	lastPage = currentPage
	currentPage = detectPageFromURL()

	// loadFile("/" + name + "/index.md");
	getPage("/" + name + ".md")
}

window.onpopstate = function(event) {
	// console.log(currentPage)
	// xhr.open("GET", currentPage);
	// xhr.send();

	// loadFile("GET", "/" + event.state + ".md");
	console.log("--------")
	currentPage = detectPageFromURL()
	loadFile(currentPage.replace(".md", "/index.md"))

}

function detectPageFromURL() {
	let page = window.location.pathname.replace('index.html','').replace('.html','').replace("/index.md", "md")
	// if (page.charAt(page.length-1) === "/") {
	// 	console.log("removing slash to " + page)
	// 	page.slice(0, -1);
	// }
	if (!(page.endsWith(".md"))) {
		page = page + ".md"
	}
	if (page === "/.md") {
		page = "dot32.md"
	}
	page = page.replace('/.md','.md')

	// let title = page.replace('.md', '')
	// title = title.substring(1)
	// title = "Dot32 | " + title
	// document.title = title

	console.log("URL pathname: " + page)
	return page
}

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

function findNewLinks() {
	let internalLinks = document.querySelectorAll("a:not([href*='://'])")

	console.log("Scanning page for internal links that should be prefetched")
	let newLinks = []
	for (i = 0; i < internalLinks.length; ++i) {

		let charPos = getPosition(internalLinks[i].href, "/", 3)
		let url = internalLinks[i].href.substring(charPos)
		url = url.split("#")[0] + ".md"

		let alreadyAdded = false
		for (let j = 0; j < newLinks.length; j++) {
  		if (url === newLinks[j]) {
  			alreadyAdded = true
  		}
		}
		for (let j = 0; j < loadedPages.length; j++) {
			if (url === loadedPages[j].name) {
  			alreadyAdded = true
	  	}
		}
		if (!alreadyAdded && (url !== "/.md")) {
			newLinks.push(url)
		}
	}
	for (i = 0; i < newLinks.length; ++i) {
		console.log("- " + newLinks[i])
	}
	for (i = 0; i < newLinks.length; ++i) {
		loadFile(newLinks[i].replace(".md", "/index.md"), true)
	}
}

function getPageData() {
	try {
	  var data = JSON.parse(document.getElementById("json").innerHTML)
	}
	catch(err) {
	  var data = JSON.parse("{}")
	  // console.log(err)
	  console.log("This page has no JSON data attached")
	}
	
	// console.log(data)

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
		console.log("Set page title: " + cardTitle)
	} else {
		document.title = `Dot32 | ${currentPage.replace('.md', '').replace('/', '')}`
	}

	if (data.description) {
		document.querySelector('meta[name="description"]').setAttribute("content", data.description);
		document.querySelector('meta[property="og:description"]').setAttribute("content", data.description);
		console.log("Set page descirption: " + data.description)
	}

	if (data.image) {
		document.querySelector('meta[property="og:image"]').setAttribute("content", `https://dot32.netlify.app${data.image}`);
		console.log("Set page thumbnail: " + `https://dot32.netlify.app${data.image}`)
	}

	contentsList()

	if (window.location.hash) {
		console.log(window.location.hash)
		let elem = document.querySelector(window.location.hash)
		elem.parentElement.className = "flash"
		let fn = function() {
			elem.parentElement.className = ""
			elem.scrollIntoView({behavior: 'smooth'});
		}
		window.setTimeout(fn, 200)
	} else {
		window.scrollTo(0, 0)
	}
}

function contentsList() {
	let list = document.getElementById("contents-ul")
	list.innerHTML = ""

	let page = document.createElement("main")
	let element = document.querySelector("main").firstChild
	let section = document.createElement("section")
	while (element) {
		// console.log(element.tagName)
		if (element.tagName == "H1" || element.tagName == "H2" ) {
			if (section.firstChild) {
				page.appendChild(section)
				section = document.createElement("section")
			}

			let li = document.createElement("li")
			let a = document.createElement("a")
			let id = element.innerHTML.replaceAll(' ', '-')
	  	a.innerHTML = element.innerHTML
	  	a.href = "#"+id
	  	// a.setAttribute('onclick',`document.getElementById(${id}).scrollIntoView({behavior: 'smooth'}); return false`)
	  	a.onclick = function(){
	  		document.getElementById(id).scrollIntoView({behavior: 'smooth'});
	  		document.getElementById(id).parentElement.className = "flash"
	  		let fn = function() {
	  			document.getElementById(id).parentElement.className = ""
	  		}
	  		window.setTimeout(fn, 32)
	  		let page = currentPage
	  		window.history.pushState(page.replace(".md", ""), `Dot32`, "#"+id); 
	  		return false
	  	}
	  	li.appendChild(a)
	  	list.appendChild(li)
	  	// console.log(element.innerHTML)

	  	element.id = id
	  	// console.log(id)
		}
		let nextElement = element.nextElementSibling
		section.appendChild(element)
		element = nextElement
	}
	page.appendChild(section)

	if (document.querySelectorAll("#contents-ul li").length < 2) {
		document.querySelector(".contents").style.display = "none"
	} else {
		document.querySelector(".contents").style.display = "block"
	}
	document.querySelector("main").replaceWith(page)

	// let pageData = {name:currentPage, content:document.querySelector("main")}
	// console.log(pageData.content)
	// let cached = false
	// for (let i = 0; i < cache.length; i++) {
 //  	if (cache[i].name === pageData.name) {
 //  		cached = true
 //  	}
	// }
	// if (!cached) {
	// 	cache.push(pageData)
	// 	console.log("added new page to cache")
	// }

	// console.log(cache)
}