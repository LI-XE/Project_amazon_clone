const jwt = require("jsonwebtoken");

module.exports = {
  authenticate(req, res, next) {
    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          console.log(err);
          res.status(401).json({ verified: false });
        } else {
          req.token = token;
          req.user = user;
          console.log("You are authenticated");
          next();
        }
      }
    );
  },

  generateToken: (user) => {
    return jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET || "somethingsecret",
      { expiresIn: "3d" }
    );
  },

  isAuth: (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        process.env.JWT_SECRET || "somethingsecre",
        (err, decode) => {
          if (err) {
            console.log(err);
            res.status(401).send({ message: "Invalid Token" });
          } else {
            console.log("authorization!!!");
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: "No Token." });
    }
  },
};
