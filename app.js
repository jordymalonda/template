const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const enrouten = require('express-enrouten');

/* eslint-disable no-console */

const app = express();
const port = config.get('PORT');

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(enrouten({
  directory: path.join(__dirname, 'controllers')
}));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
