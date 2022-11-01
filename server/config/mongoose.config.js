const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected the  database`))
  .catch((err) =>
    console.log(`Something went wrong when connecting to the  database`, err)
  );
