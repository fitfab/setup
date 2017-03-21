/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./app.config');
const users = require('./routes/users');

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

const mongodbUri = config.db_uri;

mongoose.connect(mongodbUri, options);
const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));


// Define the app server
const app = express();

// Serving static files in Express
app.use(express.static('client'));

// Using body parser for the API
app.use(bodyParser.json());

// Defines api routes for users
app.use('/api/users', users);

// Define catch all route
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});



// Wait for the database connection to establish,
// then start the app.
conn.once('open', () => {
    console.log('Connect to the mLab');
    console.log(process.env.NODE_ENV);
    // Listen in port 3000
    app.listen(3000,() => console.log('Running in localhost:3000'));
});
