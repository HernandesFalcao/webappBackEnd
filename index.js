require("dotenv").config();

require("dotenv").config();
console.log("process.env.MONGODB :>> ", process.env.MONGODB);

const Koa = require("koa");
const koaBody = require("koa-body");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const mongodb = require("./config/database");
mongodb.connect();

const userModel = require("./models/user.model");

app.use(koaBody());

router.get("/users", async (ctx, next) => {
  try {
    const users = await userModel.find().lean();
    ctx.body = users;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

router.post("/users", async (ctx, next) => {
  try {
    const { body: requestBody } = ctx;

    if (!requestBody.name) {
      throw new Error("User name not sent!");
    }
    const userCreated = await userModel.create(requestBody);
    ctx.body = userCreated;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => {
  console.log("Rodando!!!");
});
