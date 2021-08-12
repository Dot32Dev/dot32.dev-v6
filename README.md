# Dot32 dev
Welcome to my website! As it automatically renders markdown, you can view this readme in the [site itself](https://dot32.dev/readme)!

This site functions as a Single Page Application; that is to say that changing pages and navigating the website will not reload the page, it handles everything by itself 👌

Version 4 of my website is now licensed under the [GNU GPLv3](https://github.com/Dot32IsCool/dot32-website-v4/blob/main/LICENSE) license, which allows you to effectively do whatever you wish with my website, except distribute a close source varient. View the sourcecode [here](https://github.com/Dot32IsCool/dot32-website-v4/).

Credit to [Twemoji](https://twemoji.twitter.com/) for the emoji graphics, of which are licenced under the [cretive commons 4.0](https://creativecommons.org/licenses/by/4.0/) licence

This website is hosted for free by Netlify, and this badge indicates the current build status for the site. My domain was also bought under Netlify, and it provides a nice service in general, I can absolutely recomend it for your personal use :)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a6b161ad-76d8-4fee-b1cd-f86d77cbd203/deploy-status)](https://app.netlify.com/sites/dot32/deploys)

<details>
  <summary>My discord embeds</summary>
This site utilises [twitter cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards), which are nothing new, and are what create these wonderful discord embeds: <img width="533" alt="Screen Shot 2021-08-10 at 12 49 09 pm" src="https://user-images.githubusercontent.com/61964090/128809862-0b124ab4-c05e-40bc-adbc-eb8e1f137b45.png">

However, what *is* new is that depending on the url requested, the cards change. This is expected behavior for most websites, however my site is an SPA; every page is the same page! Twitter's web crawler does not run with javascript, which would make editing the card information with javascript useless. However, then I heard about something called pre-rendering. The gist of it is to preemptively render each page of the site, specifically for web crawlers, so that when scanning your site it all appears as normal. Incredibly, Netlify just has an on/off switch for this, and after turning it on, I was able to edit the cards with javascript and see the results! It was yet another example of netlify saving my ass 😆

</details>

