const md = new Remarkable({
	html: true
});
// document.getElementById("markdown").innerHTML = md.render('# tada');

var xhr = new XMLHttpRequest();
xhr.open("GET", "dot32.md");
xhr.onload = function()
{
  var text = xhr.responseText;
  // console.log(text);
  document.getElementById("markdown").innerHTML = md.render(text);
}
xhr.send();

var nodelist = document.getElementsByTagName("button")
for (let i = 0; i < nodelist.length; i++) {
  console.log(nodelist.item(i).innerHTML) // .onclick = function() {}
}