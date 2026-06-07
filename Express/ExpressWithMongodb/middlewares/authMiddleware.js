// Middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = "MeraSecretChatKey123"; // 💡 Chabi bilkul same honi chahiye jo index.js mein thi

export const verifyToken = (req, res, next) => {
  // 1. Frontend jab request bhejega, toh header mein token bhejega
  const authHeader = req.headers["authorization"];

  // Header format hota hai: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  // Agar token hai hi nahi
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied! Token nahi mila bhai.",
    });
  }

  try {
    // 2. Token ko verify karo apni khufiya chabi se
    const verified = jwt.verify(token, JWT_SECRET);

    // 3. Token ke andar jo data (userId, username) tha, use req.user mein daal do
    req.user = verified;

    // 4. Sab sahi hai, toh agle step (route handler) par bhejo
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalid Token! Kuch toh gadbad hai daya.",
    });
  }
};
