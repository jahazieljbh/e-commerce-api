import Category from "../models/Category.js";

// Crear una nueva categoría
export const createCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({ name: req.body.name });

    if (existingCategory) {
      return res.status(400).json({
        message: "La categoría ya existe",
      });
    }

    const category = await Category.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Categoría creada exitosamente",
      data: category,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else {
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  }
};

// Eliminar una categoría por ID
export const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    await Category.findByIdAndDelete(req.params.id);

    return res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log("error ", err);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Actualizar una categoría por ID
export const updateCategoryById = async (req, res) => {
  try {
    //Verificar que el nombre de la categoría no exista en la base de datos
    const categoryNameExists = await Category.findOne({ name: req.body.name });

    if (categoryNameExists) {
      return res
        .status(400)
        .json({ error: "El nombre de la categoría ya existe" });
    }

    //Buscar la categoría a actualizar por su id
    const category = await Category.findById(req.params.id);

    //Verificar que la categoría exista
    if (!category) {
      return res.status(404).json({ error: "La categoría no existe" });
    }

    //Actualizar los campos de la categoría
    category.name = req.body.name;

    //Guardar los cambios en la base de datos
    await category.save();

    return res
      .status(200)
      .json({ message: "Categoría actualizada exitosamente" });
  } catch (error) {
    //Manejar errores en caso de que ocurran
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

// Obtener categorías
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort("-_id");

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false });
    }

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
