const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect("mongodb+srv://hyangeun:En124600@cluster0.xgg8seg.mongodb.net/project_amazon_clone?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected the  database, ${MONGODB_URL}`))
  .catch((err) =>
    console.log(`Something went wrong when connecting to the  database`, err)
  );
