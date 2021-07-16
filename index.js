const md = new Remarkable({
	html: true
});

console.log(document)

var xhr = new XMLHttpRequest();
xhr.open("GET", detectPageFromURL());
console.log(detectPageFromURL())
xhr.onload = function()
{
  var text = xhr.responseText;
  // console.log(text);
  document.getElementsByTagName("main").item(0).innerHTML = md.render(text);
  hljs.highlightAll()
}
xhr.send();

function setContent(name) {
	xhr.open("GET", "/" + name + ".md");
	xhr.send();
	window.history.pushState(name, 'Dot32', '/'+name);
}

window.onpopstate = function(event) {
	console.log(detectPageFromURL())
	xhr.open("GET", detectPageFromURL());
	xhr.send();
}

function detectPageFromURL() {
	var page = window.location.pathname.replace('index.html','').replace('.html','')
	if (page.charAt(page.length-1) === "/") {
		console.log("removing slash to " + page)
		page.slice(0, -1);
	}
	page = page + ".md"
	if (page === "/.md") {
		page = "dot32.md"
	}
	page = page.replace('/.md','.md')

	console.log(page)
	return page
}