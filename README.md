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
- [MongoDB](https://www.mongodb.com/) noSQL database for storing the ships and their info
- [Mongoose](https://www.npmjs.com/package/mongoose) for interfacing with MongoDB
- [Joi](https://www.npmjs.com/package/joi) for input validation

![WIP](https://i.imgur.com/826MJ0X.jpg)
Style is not definitive. JS on the page calls home periodically to an API that calls an async function to pull all ships from the database and then the table data is updated dynamically.

It currently runs on my Raspberry Pi 4 on Ubuntu Server x64 when it doesn't crash due to a Chromium memory leak. MongoDB runs locally on the Raspberry Pi.

MongoDB only supports x64 architecture and thankfully there is an ARM64 version that runs on Nodejs10.