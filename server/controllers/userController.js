const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    const user = new User(req.body);

    user
      .save()
      .then((newUser) => {
        console.log("successful registration");
        console.log(newUser);
        res.json({
          message: "Successfully registered",
          // user: newUser,
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {
          res.status(400).json({ message: "Invalid Login Attempt - 1" });
          console.log(err);
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then((isPasswordValid) => {
              if (isPasswordValid === true) {
                console.log("password is valid");
                res
                  .cookie(
                    "usertoken",
                    jwt.sign(
                      {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                      },
                      process.env.JWT_SECRET
                    ),
                    {
                      httpOnly: true,
                      expires: new Date(Date.now() + 900000000),
                    }
                  )
                  .json({
                    message: "Successfully logged in",
                    username: user.username,
                    email: user.email,
                    userId: user._id,
                  });
              } else {
                res.status(400).json({ message: "Login and/or Email Invalid" });
              }
            })
            .catch((err) => {
              res.status(400).json({ message: "Invalid Login Attempt - 3" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Invalid Login Attempt - 4" });
      });
  },

  logout: (req, res) => {
    console.log("Logging out!");
    res.clearCookie("usertoken");
    res.json({ message: "You have successfully logged out of our system" });
  },

  getOneUser: (req, res) => {
    User.findOne({ _id: req.params.id })
      .then((oneUser) => {
        console.log(oneUser);
        res.json(oneUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};
