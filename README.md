# Daily Mumm #

It's a single page app that enable colleges in work place to collect food orders from the same restaurant, it's fast and straight forward and also divide the extras and tips on people based on their orders, send them notification emails on order delivery.

There are an online staging version for Dailymumm (check it out from [here](https://goo.gl/JBw542))

### what technologies that i used ? ###

* MongoDB - as a database, light and convenient for application purpose.
* NodeJs - as server side application representing APIs.
* Express - used as a framework on node to enable creating routes and APIs in an easy way.
* SocketIO - a node package for real-time send/receive data.
* AngularJS - as a frontend framework.
* Angular UI Router - to facilitate routing and for its features.
* Karma - as a test runner.
* Jasmine - as a unit testing framework, easy and efficient.
* HTML5/CSS3 - for sure they are used for views UI creating and styling.
* Twitter Bootstrap - as UI framework.
* SASS - as CSS preprocessor.
* Over all its MEAN stack.

### What is the pattern and the archeticture that i used ? ###

* I've applied the IIFE pattern in all my files to isolate contexts.
* I've depend on separation of dependencies so each page has a folder that hold its controller file and view file as well.
* I've separate app module initialization and app routes in 2 files.
* About the UI, I’ve did what I see simple and good in the same time for this application, video background.
* I've created a custom component for each segment in code that might be reusable later.
* I've applied components of angular 1.5 instead of directives old style.

### Setup prerequists ###

* you have to install NodeJS as it's the service and also to use its package manager npm.
* you have to install sass. ([way to install sass](http://sass-lang.com/install)).
* you should install compass to facilitate the compilation of sass to css ([Here you go](http://compass-style.org/install/)).
* you have to install MongoDb locally.

### How to run the application ###

* clone or download files in some place.
* open CMD or Terminal in the root folder you just cloned.
* write this command `npm install` to install dependencies.
* then write this command `compass compile` to compile sass files into css files.
* start mongodb, if you add it to your variables on windows create a folder name it data in c drive and write this command `mongod --dbpath c:/data`.
* then write `npm test` to run tests and make sure that they are all green.
* Finally write `npm start` to start application and run it in the browser at `http://localhost` as i've used port 80.
* Cool !!

### What's next ? ###

* planing to convert it from angularjs to angular 2.
* convert every thing to TypeScript and ES7.
* using webpack to bundle every thing.
* add more features ... 