/**
 * @typedef {import('koa').Context} KoaContext
 * @typedef {import('koa').Next} KoaNext
 */

const PORT = 3000;

const Router = require("@koa/router");
const Koa = require("koa");
const { default: koaBody } = require("koa-body");
const KoaLogger = require("koa-logger");
const db = require("./models"); // Ensure this path is correct
const cors = require("@koa/cors");
const serve = require("koa-static");
const path = require("path");

const app = new Koa();
const router = new Router();

/**
 * @param {KoaContext} ctx - Koa context object
 * @param {KoaNext} next - Koa next middleware function
 */
router.get("/", (ctx, next) => {
  ctx.response.body = { message: "Página de rodri" };
  ctx.status = 200;
});

/**
 * @param {KoaContext} ctx - Koa context object
 * @param {KoaNext} next - Koa next middleware function
 */
router.get("/healthcheck", (ctx, next) => {
  ctx.response.body = { message: "true" };
  ctx.status = 200;
});

/**
 * @param {KoaContext} ctx - Koa context object
 * @param {KoaNext} next - Koa next middleware function
 */
router.get("/books", async (ctx, next) => {
  try {
    const books = await db.Book.findAll();
    ctx.body = books;
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
});

/**
 * @param {KoaContext} ctx - Koa context object
 * @param {KoaNext} next - Koa next middleware function
 */
router.post("/api/contactos", async (ctx, next) => {
  try {
    const { nombre, apellidos, telefono, correo } = ctx.request.body;
    const newContacto = await db.Contactos.create({ nombre, apellidos, telefono, correo });
    ctx.status = 201;
    ctx.body = newContacto;
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

/**
 * @param {KoaContext} ctx - Koa context object
 * @param {KoaNext} next - Koa next middleware function
 */
router.get("/api/contactos", async (ctx, next) => {
  try {
    const contactos = await db.Contactos.findAll();
    ctx.status = 200;
    ctx.body = contactos;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(KoaLogger());
app.use(cors({ origin: "*" }));
app.use(koaBody());

// Servir archivos estáticos desde la carpeta frontend/public
app.use(serve(path.join(__dirname, "../frontend/public")));

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});


