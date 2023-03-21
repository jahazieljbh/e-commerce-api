import mongoose from "mongoose";
import Rating from "../models/Rating.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const createRating = async (req, res) => {
  const { product, rating, comment } = req.body;
  const user = req.user._id;

  if (!product) {
    return res
      .status(400)
      .json({ message: "El producto es obligatorio" });
  }

  if (!rating) {
    return res
      .status(400)
      .json({ message: "La calificación es obligatoria" });
  }

  if (rating < 1) {
    return res.status(400).json({
      message: "La calificación mínima es 1",
    });
  }

  if (rating > 10) {
    return res.status(400).json({
      message: "La calificación máxima es 10",
    });
  }

  if (comment.length > 1000) {
    return res.status(400).json({
      message: "El comentario no puede tener más de 1000 caracteres",
    });
  }

  try {
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({ message: "El producto no existe" });
    }

    const alreadyRated = await Rating.findOne({ user, product });

    if (alreadyRated) {
      return res
        .status(400)
        .json({ message: "El usuario ya calificó este producto" });
    }

    const ratingData = {
      product,
      user,
      rating,
      comment,
    }

    const newRating = await Rating.create(ratingData);

    productExists.ratings.push(newRating);
    await productExists.save();

    return res.status(201).json({ success: true, message: "Calificacion creada exitosamente", rating: newRating });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const getRatingsByProduct = async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !productId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const ratings = await Rating.find({ product: productId });

    if (!ratings || ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay calificaciones para este producto" });
    }

    return res
      .status(200)
      .json({ success: true, count: ratings.length, ratings: ratings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const getRatingsByUser = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !userId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const ratings = await Rating.find({ user: userId });

    if (!ratings || ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay calificaciones para este usuario" });
    }

    return res
      .status(200)
      .json({ success: true, count: ratings.length, ratings: ratings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const getRatingById = async (req, res) => {
  const ratingId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(ratingId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !ratingId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const rating = await Rating.findById(ratingId);

    if (!rating) {
      return res.status(404).json({
        message: "No se ha encontrado una calificación con el id especificado",
      });
    }

    return res.status(200).json({ success: true, rating: rating });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();

    if (!ratings || ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay calificaciones disponibles" });
    }

    return res.status(200).json({
      success: true,
      count: ratings.length,
      ratings: ratings
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const updateRatingById = async (req, res) => {
  const ratingId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(ratingId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !ratingId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  const { product, rating, comment } = req.body;
  const user = req.user._id;

  if (!product) {
    return res
      .status(400)
      .json({ message: "El producto es obligatorio" });
  }

  if (!rating) {
    return res
      .status(400)
      .json({ message: "La calificación es obligatoria" });
  }

  if (rating < 1) {
    return res.status(400).json({
      message: "La calificación mínima es 1",
    });
  }

  if (rating > 10) {
    return res.status(400).json({
      message: "La calificación máxima es 10",
    });
  }

  if (comment.length > 1000) {
    return res.status(400).json({
      message: "El comentario no puede tener más de 1000 caracteres",
    });
  }

  try {
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({ message: "El producto no existe" });
    }

    const ratingExists = await Rating.findById(ratingId);
    if (!ratingExists) {
      return res.status(404).json({ message: "La calificación no existe" });
    }

    if(!ratingExists.user.equals(user)){
      return res.status(401).json({ message: "No tienes permiso para modificar esta calificación" });
    }

    const alreadyRated = await Rating.findOne({ 
      user: user, product: product 
    });

    if (!alreadyRated) {
      return res
        .status(404)
        .json({ message: "No has calificado este producto todavía" });
    }

    const ratingData = {
      rating,
      comment,
    }

    const updateRating = ratingExists.updateOne(ratingData);

    return res.status(200).json({ success: true, message: "Calificacion actualizada exitosamente", rating: updateRating });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const deleteRatingById = async (req, res) => {
  const ratingId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(ratingId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !ratingId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const ratingExists = await Rating.findById(ratingId);
    const user = req.user._id;

    if (!ratingExists) {
      return res.status(404).json({ message: "La calificación no existe" });
    }

    const productExists = await Product.findById(ratingExists.product);
    if (!productExists) {
      return res.status(404).json({ message: "El producto no existe" });
    }

    if(!ratingExists.user.equals(user)){
      return res.status(401).json({ message: "No tienes permiso para eliminar esta calificación" });
    }

    productExists.ratings.remove(ratingExists._id);

    await productExists.save();

    await ratingExists.deleteOne({_id: ratingId});

    return res.status(200).json({ success: true, message: "Calificacion eliminada exitosamente" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
