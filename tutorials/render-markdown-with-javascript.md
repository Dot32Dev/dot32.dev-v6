# Render Markdown With Javascript Using Remarkable

Integrate markdown into your website, to streamline page creation!

![thumb.png](/tutorials/mysite.png)

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
## Syntax Highlighting

Syntax highlighting is one of the key reasons that i decided to use markdown. It's incredibly simple to define within the markdown rules, however by default it doesn't look very good on the page. For my syntax highlighting, I am using [highlight.js](https://highlightjs.org/).

Similarily to remarkable, you can add it via a cdn like this:
```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/styles/atom-one-dark.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/highlight.min.js"></script>
```
There are two parts to highlight.js, the first being the function that goes through formatting every code block into specific spans such as "keyword" for the given language, and the second part being the css theme that then customises the code blocks given the information from the first part.

Calling it to parse your page is as simple as pie:
```js
hljs.highlightAll()
```
Call it after setting the page content to your compiled markdown, and you should be all good! The css that we linked in the html is specifically the Atom One Dark theme, but there are [multitudes of themes](https://highlightjs.org/static/demo/) to choose from! This site uses the Atom One Dark theme as I felt it to be a good darkmode theme.

## How to load your markdown files

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
It is possible to read the URL of your website to infer what page to request, and it is also possible to *set* the URL when clicking on links, so that your entire site never has to reload the page. It's what I have done here for this website, and is called an SPA; a Single Page Application. I will not go into further details about this however, as it shouldn't be too hard to google anything else you want :3

Happy coding!

<div id="json">
	{
		"author": "Dot32",
		"date": "24th Jul 2021",
		"title": "Render markdown with javascript!",
    "description": "Integrate markdown into your website, to streamline page creation!"
  }
</div>