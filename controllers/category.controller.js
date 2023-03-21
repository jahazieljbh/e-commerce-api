import mongoose from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Crear una nueva categoría
export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "El nombre de la categoría es obligatorio",
    });
  }

  try {
    const categoryExists = await Category.findOne({ name: name });

    if (categoryExists) {
      return res.status(409).json({
        message: "La categoría ya existe",
      });
    }

    const categoryData = {
      name
    }

    const category = await Category.create(categoryData);

    return res.status(201).json({
      success: true,
      message: "Categoría creada exitosamente",
      category: category,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Eliminar una categoría por ID
export const deleteCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !categoryId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const categoryExists = await Category.findById(categoryId);

    if (!categoryExists) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    // Verificar si hay productos asociados a la categoría antes de eliminarla
    const products = await Product.find({ category: categoryId });

    if (products && products.length > 0) {
      return res.status(409).json({
        message:
          "No se puede eliminar la categoría porque hay productos asociados",
      });
    }

    await categoryExists.deleteOne({ _id: categoryId });

    return res
      .status(200)
      .json({ success: true, message: "Categoria eliminada exitosamente" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Actualizar una categoría por ID
export const updateCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !categoryId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "El nombre de la categoría es obligatorio",
    });
  }

  try {
    const categoryExists = await Category.findById(categoryId);

    //Verificar que la categoría exista
    if (!categoryExists) {
      return res.status(404).json({ message: "La categoría no existe" });
    }

    //Verificar si la categoría tiene productos asociados
    const productsAssociated = await Product.find({ category: categoryId });

    if (productsAssociated && productsAssociated.length > 0) {
      //Si hay productos asociados a esta categoria, entonces no se puede actualizar
      return res
        .status(409)
        .json({
          message:
            "No se puede actualizar esta categoría porque hay productos asociados",
        });
    }

    const categoryData = {
      name
    }

    const updateCategory = await Category.updateOne(categoryData);

    return res
      .status(200)
      .json({ success: true, message: "Categoria actualizada exitosamente", category: updateCategory });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Obtener categorías
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res
        .status(404)
        .json({ message: "No hay categorias" });
    }

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories: categories,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !categoryId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const categoryExists = await Category.findById(categoryId);

    if (!categoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "No existe la categoria" });
    }

    return res.status(200).json({ success: true, category: categoryExists });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};
