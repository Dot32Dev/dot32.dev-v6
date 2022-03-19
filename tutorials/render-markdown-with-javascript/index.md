# Render Markdown With Javascript Using Remarkable

Integrate markdown into your website, to streamline page creation! This tutorial explains a lot within the comments of the code blocks, make you read it all to understand everything properly.

![thumb.png](/tutorials/render-markdown-with-javascript/thumb.png)

In this tutorial, we will be using [remarkable](https://github.com/jonschlinkert/remarkable), for it's ease of use and quality. Getting remarkable into your project is as simple as adding this line into your html:
```html
<script src="https://cdn.jsdelivr.net/remarkable/1.7.1/remarkable.min.js"></script>
```
This downloads a script from jsdelivr's cdn, which has been kind enough to host remarkable for us. Now getting it up and running is as simple as writing these few lines!
```js
const md = new Remarkable();

console.log(md.render('# tada!'));
// will log <h1>tada!</h1>
```

By default, remarkable will parse html tags as escaped text. This would be useful if users were given the power of markdown (such as for comments), in which case it may not be advisable to give them the power of custom html elements and styles. However, if this is something you want for yourself, you can enable it in the constructor.

For my site I enabled this, as nobody will be using this maliciously. When creating a new remarkable, you can specify an object of settings:
```js
const md = new Remarkable({
	html:true
});
```
To see more options, read [this section](https://github.com/jonschlinkert/remarkable#options) of the github readme 👌 

Here is a full example on using remarkable that sets a div with the id of "content" to rendered markdown:
```js
const md = new Remarkable({
	html:true
});

document.getElementById("content").innerHTML = md.render('# tada!')
```

## Loading the markdown files

Loading markdown files within javascript isn't as simple as you might think, but it isn't impossible either. The javascript file will have to make a request to the server for the specified file.

Here is how it is done:
```js
let xhr = new XMLHttpRequest();
xhr.open("GET", "index.md"); // asking for index.md
xhr.onload = function() // the onload callback is (asynchronously) sent when the file finishes loading
{
  let text = xhr.responseText;
  document.getElementById("content").innerHTML = md.render(text) // sets page content to rendered text
}
xhr.send(); // actually sends the request
```

## Syntax Highlighting

Syntax highlighting is one of the key reasons that i decided to use markdown. It's incredibly simple to define within the markdown rules, however by default it doesn't actually look very good on the page. For my syntax highlighting, I am using [highlight.js](https://highlightjs.org/).

Similarily to remarkable, you can add it via a cdn like this:
```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/styles/atom-one-dark.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/highlight.min.js"></script>
```
The first line links the css, which is what styles the code blocks. If you wish, you can target the classes yourself for a custom theme. The second line is what looks through the code blocks and identifies key elements such as variables, functions, etc, putting them into classes so that you dont have to do it yourself.

Asking it to parse the page is as simple as putting this line after you set your page content:
```js
hljs.highlightAll()
```
Call it directly after setting the page content, within the onload function. The css that we linked in the html is specifically the Atom One Dark theme, but there are [multitudes of themes](https://highlightjs.org/static/demo/) to choose from! This site uses the Atom One Dark theme as I felt it to be a good darkmode theme.

## You're half way there to building an SPA

A "Single Page Application" is a website in which the page never reloads, it just requests the content it needs as you navigate. Things get more complicated as you realise editing/reading from the URL is required, assuming you want to share links to specific pages or have google web crawl your pages. I am reading the url with this value:
```javascript
window.location.pathname
```
It returns the `/epic-page` from `www.epicsite/epic-page`. You can also directly set the value to something of your choosing, however this reloads the page. Idealy in a single page application, reloading the page should never need to happen! It allows for a smoother experience on the end user. To get around this, setting the url is done by manipulating the search history. This isnt too hard if you can understand the code I placed below:

```javascript
let name = "epic-page" // the name of the page we're linking to
window.history.pushState(name, `empty string`, '/'+name); // leave `empty string` blank, this code sets the URL. The first parameter is the "state", which gets stored for later

...

window.onpopstate = function(event) { // called when the user navigates through history with back/forwards buttons
	xhr.open("GET", '/'+event.state); // we saved the page name into the state, so we can do the xhr request on it.
	xhr.send();
}
```
Hopefully the contents of this admitedly long tutorial helped you, happy coding!

<div id="json">
	{
		"author": "Dot32",
		"date": "24th Jul 2021",
		"title": "Render markdown with javascript",
    "description": "Integrate markdown into your website, to streamline page creation!",
		"image": "/tutorials/render-markdown-with-javascript/thumb.png"
  }
</div>