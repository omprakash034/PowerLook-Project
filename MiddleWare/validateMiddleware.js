const jwt = require("jsonwebtoken");

const JWT_SECRET = 'oejhgjpeoiuhfjhugykrjfkdsl;fkagyLKJFHGEIUGYVGEWIHUGHCJwiuyuftcweffdhgvhfhugh';

exports.validateMiddleware = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  console.log(authHeader);

  if(!authHeader || !authHeader.startsWith("Bearer"))
  {
    return  res.status(401).json({ message: "Access Denied: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try 
  {
   const decoded = jwt.verify(token,  JWT_SECRET) 
    req.id=decoded.id;
    next();
  } 
  catch (error) 
  {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};