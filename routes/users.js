const express = require("express");
const router = express.Router();
const Users = require("../models/users");

/**
 * Add new user to the application
 */
router.post("/signup", (req, res) => {
  const user = new Users({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });

  try {
    Users.findOne({ email: req.body.email }, async function (err, data) {
      if (!data) {
        const newUser = await user.save();
        res.status(201).json(newUser);
      } else {
        res.status(201).json("This user already exist.");
      }
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

/**
 * Let the users to login
 */
router.post("/login", (req, res) => {
  try {
    Users.findOne({ email: req.body.email }, function (err, data) {
      if (data) {
        console.log(data._id);
        if (data.password == req.body.password && data.isActive == true) {
          req.session.userId = data._id;
          res.status(201).json({ userId: data._id });
        } else {
          res.status(201).json("Invalid credentials");
        }
      } else {
        res.status(201).json("This email is not registered");
      }
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

/**
 * Let the user to update the password
 */
router.post("/resetpass", (req, res) => {
  try {
    Users.findOne({ email: req.body.email }, async function (err, data) {
      if (data) {
        if (req.body.password == req.body.confpassword) {
          data.password = req.body.password;
          const saveUser = await data.save();
          res.status(201).json({ message: "success" });
        } else {
          res.status(201).json("Password does not match with confirm password");
        }
      } else {
        res.status(201).json("This email is not registered");
      }
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

/**
 * Deactivate user
 */
router.post("/deactivate", (req, res) => {
  try {
    Users.findOne({ email: req.body.email }, async function (err, data) {
      if (data) {
        data.isActive = req.body.isActivate;
        const saveUser = await data.save();
        res.status(201).json({ message: "success" });
      } else {
        res.status(201).json("This email is not registered");
      }
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

module.exports = router;
