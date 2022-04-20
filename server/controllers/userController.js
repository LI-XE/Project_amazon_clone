const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken, isAuth } = require("../config/jwt.config");
const orderController = require("./orderController");
const { update } = require("../models/userModel");

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
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: generateToken(newUser),
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
                        _id: user._id,
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
                    _id: user._id,
                    token: generateToken(user),
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

  getOneUser: async (req, res) => {
    await User.findOne({ _id: req.params.id })
      .then((oneUser) => {
        // console.log("One User");
        // console.log(oneUser);
        res.json({
          _id: oneUser._id,
          username: oneUser.username,
          email: oneUser.email,
        });
        // console.log(oneUser.id);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateProfile: async (req, res) => {
    const _id = req.params.id;
    const user = await User.findOneAndUpdate(
      { _id },
      { username: req.body.username }
    );
    res.json({
      _id: user._id,
      username: user.username,
      isAuth: user.isAuth,
      token: generateToken(user),
    });
  },
};
