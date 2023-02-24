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
          isSeller: newUser.isSeller,
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
                      expires: new Date(Date.now() + 900000),
                    }
                  )
                  .json({
                    message: "Successfully logged in",
                    username: user.username,
                    email: user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    isSeller: user.isSeller,
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
        console.log(oneUser);
        res.json({
          _id: oneUser._id,
          username: oneUser.username,
          email: oneUser.email,
          isAdmin: oneUser.isAdmin,
          isSeller: oneUser.isSeller,
        });
        // console.log(oneUser.id);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateProfile: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: updatedUser.isSeller,
        token: generateToken(updatedUser),
      });
    }
  },

  // Admin
  adminUser: (req, res) => {
    User.find({})
      .then((users) => res.send(users))
      .catch((err) => res.send(err));
  },

  // Delete User
  deleteUser: (req, res) => {
    console.log("id: " + req.params.id);
    User.findById(req.params.id)
      .then((user) => {
        if (user.email === "bbbbb@gmail.com") {
          res.status(400).send({ message: "Can Not Delete Admin User." });
          return;
        }
        const deletedUser = user.remove();
        console.log(deletedUser);
        res.json({ message: "User is deleted.", user: deletedUser });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // Edit User
  editUser: (req, res) => {
    console.log("id: " + req.params.id);
    console.log(req.body);
    User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUser) => {
        console.log(updatedUser);
        res.json({ message: "User Updated.", user: updatedUser });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};
