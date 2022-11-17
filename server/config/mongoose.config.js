const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL || "mongodb://localhost/amazonDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected the  database, ${MONGODB_URL}`))
  .catch((err) =>
    console.log(`Something went wrong when connecting to the  database`, err)
  );
