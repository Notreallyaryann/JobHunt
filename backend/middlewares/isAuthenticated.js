import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // check cookie first, then Authorization header
    const token =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decode.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      success: false
    });
  }
};

export default isAuthenticated;
