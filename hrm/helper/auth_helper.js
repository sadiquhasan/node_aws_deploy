const ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  console.log("Error Message", "You are not authorized user");
  res.redirect("/auth/login", 302, {});
};

module.exports = ensureAuthenticated;
