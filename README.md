# Fleet Weather

Work in progress.

The project's objective is to create a Node.js app that continously monitors all vessels in a commercial fleet for the weather at their position and displays it through a friendly user interface. The user would be able to set vessels of interest and maybe even receive notifications in case of upcoming bad weather.

Tools used:

- [Node.js](https://github.com/nodejs) for Server-side runtime
- [Express.js](https://github.com/expressjs/express) for HTTP communication with the client
- [Puppeteer](https://github.com/puppeteer/puppeteer) for web scrapping
- [Pug](https://github.com/pugjs) as template engine
- [Bootstrap](https://github.com/twbs/bootstrap) for styling and reactive design
- [Moment](https://github.com/moment/moment/) for keeping track of elapsed time on client side
- [Debug](https://www.npmjs.com/package/debug) for debugging on server side

![WIP](https://i.imgur.com/826MJ0X.jpg)
Style is not definitive. Data gets updated automatically without refreshing the page.

It currently runs on my Raspberry Pi 4 when it doesn't crash due to a Chromium memory leak and it needs its own branch because Puppeteer needs a launch parameter on Rasberry OS for Chromium's location.
