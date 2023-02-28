import Product from "../models/Product.js";
import Category from "../models/Category.js"
import validator from "validator";

// Crear un producto
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, colors, tags, category, brand, stock } = req.body;

    if (!name || !description || !price || !images || !colors || !tags || !category || !brand || !stock) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    }

    if (price < 0) {
      return res.status(400).json({
        success: false,
        message: "El precio no puede ser negativo",
      });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'La categoría especificada no existe' });
    }

    const existingProduct = await Product.findOne({ name, brand });
    if (existingProduct) {
      return res.status(400).json({ message: 'Ya existe un producto con el mismo nombre y marca' });
    }

    if (stock < 0) {
      return res.status(400).json({
        success: false,
        message: "El stock no puede ser negativo",
      });
    }

    if (!Number.isInteger(stock)) {
      return res.status(400).json({
        success: false,
        message: "El stock debe ser un número entero",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      images,
      colors,
      tags,
      category,
      brand,
      stock,
    });

    // Agregar el ID del producto creado a la lista de productos de la categoría correspondiente
    categoryExists.products.push(product._id);
    await categoryExists.save();

    return res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Error al crear el producto" });
  }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort("-_id");

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "No se encontró el producto" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Ha ocurrido un error" });
  }
};

// Controller para actualizar un producto por su ID
export const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validar los datos de entrada
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Buscar el producto en la base de datos
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).send("No se ha encontrado el producto");

    // Actualizar los campos del producto con los datos de entrada
    Object.assign(product, req.body);

    // Guardar el producto en la base de datos
    await product.save();

    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err });
  }
};

// Eliminar un producto por ID
export const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No se ha encontrado el producto",
      });
    }

    return res.status(204).json({
      success: true,
      data: null,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
};
