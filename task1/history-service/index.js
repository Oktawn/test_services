require("dotenv").config();

const cors = require('@koa/cors');
const koa = require('koa');
const { bodyParser } = require("@koa/bodyparser");
const logRouter = require('./src/logging/logs.controller.js');

const app = new koa();
app.use(bodyParser());
app.use(cors());
app.use(logRouter.routes());

const port = process.env.LOGGER_PORT ?? 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));