# Fleet Weather

Work in progress.

The project's objective is to create a Node.js app that continously monitors all vessels in a commercial fleet for the weather at their position and displays it through a friendly user interface. The user would be able to set vessels of interest and maybe even receive notifications in case of upcoming bad weather.

Tools and npm modules used:

- [Node.js](https://github.com/nodejs) for Server-side runtime
- [Express.js](https://github.com/expressjs/express) for HTTP communication with the client
- [Puppeteer](https://github.com/puppeteer/puppeteer) for web scrapping
- [Pug](https://github.com/pugjs) as template engine
- [Bootstrap](https://github.com/twbs/bootstrap) for styling and reactive design
- [Moment](https://github.com/moment/moment/) for keeping track of elapsed time on client side
- [dotenv](https://www.npmjs.com/package/dotenv) for storing environment variables
- [Debug](https://www.npmjs.com/package/debug) for debugging on server side
- [MongoDB](https://www.mongodb.com/) noSQL database for storing the ships and their info
- [Mongoose](https://www.npmjs.com/package/mongoose) for interfacing with MongoDB
- [Joi](https://www.npmjs.com/package/joi) for input validation
- [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) for generating and validating JWTs
- [Winston](https://www.npmjs.com/package/winston) for logging
- [Jest](https://jestjs.io/) for unit testing

![WIP](https://i.imgur.com/AfoVgru.jpg)
Style is not definitive. JS on the page calls home periodically to an API that calls an async function to pull all ships from the database and then the table data is updated dynamically. Location, Position and Wind cells are clickable and link to Vessel Finder and Windy respectively.

It currently runs on my Raspberry Pi 4 on Ubuntu Server x64 when it doesn't crash due to a Chromium memory leak. MongoDB runs locally on the Raspberry Pi.

MongoDB only supports x64 architecture and thankfully there is a Nodejs10 version that runs on ARM64.
