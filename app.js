const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const service = require('./utils/service');

/* eslint-disable no-console */

const app = express();
const port = config.get('PORT');

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', service.get);
app.post('/', service.create);
app.put('/', service.update);
app.delete('/', service.delete);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
