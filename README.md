# Dot32.dev-v4
This is version 4 of my website, check out the latest version [here.](https://github.com/Dot32IsCool/dot32.dev)

I made this site when I was 16, excuse my unprofessionalism lmao.

This site functions as a Single Page Application; that is to say that changing pages and navigating the website will not reload the page, it handles everything by itself 👌

This version of the website is licensed under the [GNU GPLv3](https://github.com/Dot32IsCool/dot32-website-v4/blob/main/LICENSE) license, which allows you to effectively do whatever you wish with my website, except distribute a close source varient. View the sourcecode [here](https://github.com/Dot32IsCool/dot32-website-v4/).

Credit to [Twemoji](https://twemoji.twitter.com/) for the emoji graphics, of which are licenced under the [cretive commons 4.0](https://creativecommons.org/licenses/by/4.0/) licence

<details>
  <summary>My discord embeds</summary>
  
This site utilises [twitter cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards), which are nothing new, and are what create these wonderful discord embeds: 
  <img width="533" alt="Screen Shot 2021-08-10 at 12 49 09 pm" src="https://user-images.githubusercontent.com/61964090/128809862-0b124ab4-c05e-40bc-adbc-eb8e1f137b45.png">

However, what *is* new is that depending on the url requested, the cards change. This is expected behavior for most websites, however my site is an SPA; every page is the same page! Twitter's web crawler does not run with javascript, which would make editing the card information with javascript useless. However, then I heard about something called pre-rendering. The gist of it is to preemptively render each page of the site, specifically for web crawlers, so that when scanning your site it all appears as normal. Incredibly, Netlify just has an on/off switch for this, and after turning it on, I was able to edit the cards with javascript and see the results! It was yet another example of netlify saving my ass 😆

</details>
<details>
  <summary>Shiny thumbnail images</summary>
  
  When hovering over a thumbnail on the projects or tutorials page, it plays a "shine" animation. Credit to [AntonTrollback](http://jsfiddle.net/user/AntonTrollback/) for his [shine effect jsfiddle](http://jsfiddle.net/AntonTrollback/nqQc7/)
