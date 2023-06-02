var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signup, signin, isSignedIn, signout } = require("../controllers/auth");

router.post(
  "/signup",
  [
    //Express-validator
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
  signup //controller
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("email is required"),
    check("password", "password field is required").isLength({
      min: 1,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
