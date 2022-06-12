const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8086"
};
app.use(cors(corsOptions));

const fileRoutes = require('./router/index').fileRouts;
const defaultRoute = require('./router/index').defaultPage;

app.use(express.urlencoded({ extended: true }));
fileRoutes(app);
defaultRoute(app);

function initializeDatabaseConnection(){
  require('./database/mongo/connection')
}

initializeDatabaseConnection()

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});