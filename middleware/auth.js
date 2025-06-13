const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.headers);

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      status: "failed",
      message: "Authorization failed! You must be logged in!",
    });
  }

  const token = authorizationHeader.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SALT);

    // ✅ Attach decoded user info (e.g., _id) to req.user
    req.user = decoded;

    next(); // 🔥 Only move to the next step if token is valid
  } catch (e) {
    return res.status(401).json({
      status: "failed",
      message: "Authorization failed! Invalid token",
    });
  }
};

module.exports = auth;
