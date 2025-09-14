const { default: mongoose } = require("mongoose");
const app = require("./app");
const PORT = 5000;
const MONGO_URL = "mongodb://localhost:27017/database_chothuenha";
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connect successfully !!!");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log("❌ Database connection error:", err)); 