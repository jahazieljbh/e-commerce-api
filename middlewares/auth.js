import asyncHandler from 'express-async-handler';
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { JWT_SECRET } from "../config/config.js";


const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if(!token){
      return res.status(404).json({ message: "No hay token adjunto al encabezado" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Token no válido" });
    }

    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) {
      return res.status(401).json({ message: "No autorizado para acceder a este recurso" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token no valido, Inica sesion"});
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email })

  if (adminUser.role !== "admin") {
    return res.status(401).json({ message: "Permisos insuficientes para acceder a este recurso" });
  } else {
    next();
  }
});

export { auth, isAdmin };