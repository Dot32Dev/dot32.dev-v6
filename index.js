const md = new Remarkable({
	html: true
});
// document.getElementById("markdown").innerHTML = md.render('# tada');
// var page = "Dot32.md"
// if (window.location.pathname === "/tutorials" || window.location.pathname === "/tutorials/" || window.location.pathname === "/tutorials/index.html") {
// 	page = "Tutorials.md"
// 	document.getElementsByTagName("main").item(0).innerHTML = "these tutorials are call amirite"
// }
var page = window.location.pathname.replace('index.html','')
console.log(page)
page = page + ".md"
if (page === "/.md") {
	page = "Dot32.md"
}

var xhr = new XMLHttpRequest();
xhr.open("GET", page);
xhr.onload = function()
{
  var text = xhr.responseText;
  // console.log(text);
  document.getElementsByTagName("main").item(0).innerHTML = md.render(text);

  document.getElementById("url").innerHTML = "<h3>Testing (ignore)</h3><br>" + window.location.href + "<br>" + window.location.hostname + "<br>" + window.location.host + "<br>" + window.location.pathname
}
xhr.send();

// var nodelist = document.getElementsByTagName("button")
// for (let i = 0; i < nodelist.length; i++) {
//   console.log(nodelist.item(i).innerHTML) // .onclick = function() {}
// }
function Dot32() {
	xhr.open("GET", "Dot32.md");
	xhr.send();
	window.history.pushState('', 'Dot32', '/');
}
function Projects() {
	xhr.open("GET", "Projects.md");
	xhr.send();
	// window.location.pathname = "/projects"
	window.history.pushState('projects', 'Dot32', '/projects');
}
function Tutorials() {
	xhr.open("GET", "Tutorials.md");
	xhr.send();
	window.history.pushState('tutorials', 'Dot32', '/tutorials');
}

function setContent(name) {
	xhr.open("GET", name+".md");
	xhr.send();
	window.history.pushState(name, 'Dot32', '/'+name);
}