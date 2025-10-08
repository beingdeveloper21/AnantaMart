import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Expect "Bearer <token>"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure decoded contains admin info
    if (!decoded?.email || decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    req.admin = decoded; // optional: attach admin info to req
    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    res.status(401).json({ success: false, message: "Not authorized" });
  }
};

export default adminAuth;
