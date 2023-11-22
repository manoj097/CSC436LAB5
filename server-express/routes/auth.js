const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;

// rest of the code...

const saltRounds = 10;
router.use(function (req, res, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.hashedPassword = hash;
      next();
    });
  });
});

router.post("/register", async function (req, res, next) {
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password === req.body.passwordConfirmation) {
      const user = new User({
        username: req.body.username,
        password: req.hashedPassword,
      });
      return await user
        .save()
        .then((savedUser) => {
          return res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    res.status(400).json({ error: "Passwords not matching" });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});


router.post("/login", async function (req, res, next) {
  if (req.body.username && req.body.password) {
    const user = await User.findOne()
      .where("username")
      .equals(req.body.username)
      .exec();
    if (user) {
      return bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result === true) {
            const token = jwt.sign({ id: user._id }, privateKey, {
              algorithm: "RS256",
            });
            return res.status(200).json({ access_token: token });
          } else {
            return res.status(401).json({ error: "Invalid credentials." });
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    return res.status(401).json({ error: "Invalid credentials." });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});


module.exports=router;