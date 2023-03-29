require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const SocketIO = require("socket.io");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const uploadRouter = require("./routers/uploadRouter.js");

const cors = require("cors");
const cookieParser = require("cookie-parser");

//server configuration first
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

// run the Mongoose connect file
require("./config/mongoose.config");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// console.log(upload);

const accessKey = process.env.ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const secretAccessKey = process.env.SECRECT_ACCESS_KEY;

console.log(accessKey);
console.log(bucketName);
console.log(bucketRegion);
console.log(secretAccessKey);

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

app.post("/api/uploads", upload.single("file"), (req, res) => {
  try {
    console.log("req.file", req.file);
    console.log("req.body", req.body);

    const params = {
      Bucket: bucketName,
      Key: Date.now() + req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    console.log(command);
    s3.send(command);

    const getObjectParams = {
      Bucket: bucketName,
      Key: command.Key,
    };

    const getImages = new GetObjectCommand(getObjectParams);
    const imageUrl = getSignedUrl(s3, getImages, { expiresIn: 3600 });

    // return res.status(200).json(`/${req.file.filename}`);
    return res.status(200).json(imageUrl);
  } catch (err) {
    console.log(err);
  }
});

require("./routers/productRouter")(app);
require("./routers/userRouter")(app);
require("./routers/orderRouter")(app);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/", (req, res) => {
  res.send("Server is ready ");
});

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/amazon_clone/build")));
app.get("*", (req, res) =>
  res.sendFile(path, join(__dirname, "/amazon_clone/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.MY_PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
