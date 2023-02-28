import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config/config.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user || user.isBlocked) {
      return res.status(401).json({ error: "Usuario no autorizado" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "No autorizado para acceder a este recurso" });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Acceso no autorizado" });
  }
};
