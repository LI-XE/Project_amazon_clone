const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (user) => {
    return jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
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

  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      // console.log(req.user)
      next();
    } else {
      console.log(req.user);
      res.status(401).send({ message: "Invalid Admin Token." });
    }
  },

  isSeller: (req, res, next) => {
    if (req.user && req.user.isSeller) {
      // console.log(req.user)
      next();
    } else {
      console.log(req.user);
      res.status(401).send({ message: "Invalid Seller Token." });
    }
  },

  isSellerOrAdmin: (req, res, next) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
      // console.log(req.user)
      next();
    } else {
      console.log(req.user);
      res.status(401).send({ message: "Invalid Seller/Admin Token." });
    }
  },
};
