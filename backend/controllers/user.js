const User = require("../models/user"); //   ../ means backdirectory to models then there user model is there

exports.getUserById = async (req, res, next, id) => {
  // User.findById(id).exec((err, user) => {
  //   if (err || !user) {
  //     return res.status(400).json({
  //       error: "No user was found in DB",
  //     });
  //   }
  //   req.profile = user;
  //   next();
  // });

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      error: "No user was found in DB",
    });
  }
  req.profile = user;
  next();
};

exports.getUser = (req, res) => {
  //todo get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        err: "No Users found",
      });
    }
    res.json(users);
  });
};
