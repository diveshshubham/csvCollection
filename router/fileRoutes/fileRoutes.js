const express = require("express");
const router = express.Router();
const controller = require("../../controller/index").fileController;
let routes = (app) => {
  router.post("/upload", controller.upload);
  app.use(router);
};
module.exports = routes;
