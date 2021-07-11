const md = new Remarkable({
	html: true
});
// document.getElementById("markdown").innerHTML = md.render('# tada');
// var page = "Dot32.md"
// if (window.location.pathname === "/tutorials" || window.location.pathname === "/tutorials/" || window.location.pathname === "/tutorials/index.html") {
// 	page = "Tutorials.md"
// 	document.getElementsByTagName("main").item(0).innerHTML = "these tutorials are call amirite"
// }
// var page = window.location.pathname.replace('index.html','').replace('.html','')
// console.log(page)
// if (page.charAt(page.length-1) === "/") {
// 	page.slice(0, -1);
// }
// page = page + ".md"
// if (page === "/.md") {
// 	page = "Dot32.md"
// }

var xhr = new XMLHttpRequest();
xhr.open("GET", detectPageFromURL());
xhr.onload = function()
{
  var text = xhr.responseText;
  // console.log(text);
  document.getElementsByTagName("main").item(0).innerHTML = md.render(text);
}
xhr.send();

// var nodelist = document.getElementsByTagName("button")
// for (let i = 0; i < nodelist.length; i++) {
//   console.log(nodelist.item(i).innerHTML) // .onclick = function() {}
// }

function setContent(name) {
	xhr.open("GET", "/" + name + ".md");
	xhr.send();
	window.history.pushState(name, 'Dot32', '/'+name);
}

window.onpopstate = function(event) {
  // console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
  if (event.state) {
  	xhr.open("GET", detectPageFromURL());
  	xhr.send();
  }
}

function detectPageFromURL() {
	var page = window.location.pathname.replace('index.html','').replace('.html','')
	if (page.charAt(page.length-1) === "/") {
		page.slice(0, -1);
	}
	page = page + ".md"
	if (page === "/.md") {
		page = "dot32.md"
	}
	console.log(page)
	return page
}