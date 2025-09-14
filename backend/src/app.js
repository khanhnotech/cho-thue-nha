require("dotenv").config()
const path = require("path")
const express = require("express");
const cors = require("cors")
const morgan = require("morgan");
const routes = require("./routes")
const app = express();
// Middleware
app.use(cors())
app.use(express.json())

app.use(morgan("dev"));
// Store/img_Apartment
app.use("/Store", express.static(path.join(__dirname, "Store")))
// routers init
routes(app)
module.exports = app
// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });
