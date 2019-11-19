require('custom-env').env(true);
require('express-async-errors');
require('./database');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const error = require('./middlewares/error');

const app = express();

console.log('AAAAAAAAAA', process.env.NODE_ENV);
console.log(process.env.DATABASE_URL);

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(error);

const PORT = process.env.PORT || 3000;
app.listen(PORT);