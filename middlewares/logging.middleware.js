exports.loggingMiddleware = (req, res, next) => {
  console.log("user requested for " + req.url + " with method " + req.method);
  next();
};