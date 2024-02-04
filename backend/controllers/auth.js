const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

const SECRET = "Heyy";

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array()[0].msg);
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);

  User.create(user)
    .then((user) => {
      res.json({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    })
    .catch((error) => {
      // Handle the error
      console.error("Error creating user:", error);
      res.status(400).json({ error: "Failed to create user" });
    });
  console.log(user);
};

exports.signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    const { email, password } = req.body; //destructuring code

    console.log(email);

    if (!errors.isEmpty()) {
      ///validation error
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }

    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      return res.status(400).json({
        error: "User email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: SECRET,
  userProperty: "auth",
});

//custom middlewares

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    //role of profile is 0 then he is not admin if 1 then admin.
    return res.status(403).json({
      error: "You are not ADMIN,Access denied",
    });
  }

  next();
};

exports.signout = (req, res) => {
  //Clear the Cooky
  res.clearCookie("token");

  res.json({
    message: "Prosumer signout successfully",
  });
};
