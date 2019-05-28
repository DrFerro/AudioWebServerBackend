require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const jwt = require('app/util/jwtRouter');
const errorHandler = require('app/util/errorHandler');

// Disable X-Powered-By header
app.disable('x-powered-by');

// Middlewares
// Allow transfer of simple data like text
app.use(bodyParser.urlencoded({ extended: false }));
// Prepare the app to exchange json
app.use(bodyParser.json());
app.use(cors());
// Use morgan to see requests at console
app.use(morgan('dev'));
//app.use(morgan('combined'));

// Use JWT auth to secure the api
app.use(jwt());

// Api routes
app.use('/api', require('app/routes'));

// Global error handler
app.use(errorHandler);

// Start server
const port = 4000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
