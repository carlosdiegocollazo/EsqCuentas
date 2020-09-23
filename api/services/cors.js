const cors         = require('cors');
const corsOptions  = {
    "origin": '*',
    "methods": "GET,HEAD,PUT,POST,DELETE,OPTIONS",
    "preflightContinue": false,
    "allowedHeaders": ['Content-Type', 'Authorization', 'mytoken'],
    "optionsSuccessStatus": 204
  }

let Cors = {
  cors: cors,
  corsOptions: corsOptions
}

module.exports = Cors;