require("dotenv").config();
const cors = require('@koa/cors');
const koa = require('koa');
const { bodyParser } = require("@koa/bodyparser");
const ProductsRouter = require('./src/products/products.controller.js')
const InventoryRouter = require('./src/inventory/inventory.controller.js')


const app = new koa();
app.use(bodyParser());
app.use(cors());
app.use(ProductsRouter.routes()).use(ProductsRouter.allowedMethods());
app.use(InventoryRouter.routes()).use(InventoryRouter.allowedMethods());
const port = process.env.SERVICE_PORT ?? 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));