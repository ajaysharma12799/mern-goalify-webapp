const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/user.model");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token From Headers
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWTSECRET);

      // Get User From Token
      const user = await UserModel.findById(decoded.id).select("-password");

      // Set User into Request
      req.user = user;

      // Call Next Middleware
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorised");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorised, No Token");
  }
});

module.exports = {
  protect,
};
