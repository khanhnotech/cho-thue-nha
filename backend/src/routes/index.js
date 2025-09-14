const apartmentsRoutes = require("./apartments");
const registerRoutes = require("./register");
const loginRoutes = require("./login");
const verifygmailRoutes = require("./verifygmail");
const myApartmentRouter = require("./myApartment");

function routes(app) {
  app.use("/apartments", apartmentsRoutes);
  app.use("/register", registerRoutes);
  app.use("/login", loginRoutes);
  app.use("/verify-gmail", verifygmailRoutes);
  app.use("/api/my-apartment", myApartmentRouter);
  // app.use('/', siteRoutes)
}

module.exports = routes;
