import mongoose from "mongoose";
import slugify from "slugify";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Rating from "../models/Rating.js";

// Crear un producto
export const createProduct = async (req, res) => {
  const { name, slug, description, price, images, colors, tags, category, brand, stock } = req.body;
  
  if (!name) {
    return res
      .status(400)
      .json({ message: "El nombre del producto es obligatorio" });
  }

  if (!description) {
    return res
      .status(400)
      .json({ message: "La descripción es obligatoria" });
  }

  if (!price) {
    return res
      .status(400)
      .json({ message: "El precio es obligatorio" });
  }

  if (price < 0) {
    return res.status(400).json({
      message: "El precio no puede ser negativo",
    });
  }

  if (images.length > 5) {
    return res
      .status(400)
      .json({ message: "El número máximo de imágenes es 5" });
  }

  if (!category) {
    return res
      .status(400)
      .json({ message: "La categoria es obligatoria" });
  }

  if (!brand) {
    return res
      .status(400)
      .json({ message: "La marca es obligatoria" });
  }

  if (!stock) {
    return res
      .status(400)
      .json({ message: "El stock es obligatorio" });
  }

  if (stock < 0) {
    return res.status(400).json({
      message: "El stock no puede ser negativo",
    });
  }

  if (!Number.isInteger(stock)) {
    return res.status(400).json({
      message: "El stock debe ser un número entero",
    });
  }
  
  try {
    const categoryExists = await Category.findOne({ name: category });
    if (!categoryExists) {
      return res
        .status(404)
        .json({ message: "La categoría especificada no existe" });
    }

    let slug = slugify(name);

    const productData = {
      name,
      slug,
      description,
      price,
      images,
      colors,
      tags,
      category: categoryExists._id,
      brand,
      stock,
    }

    const product = await Product.create(productData);

    categoryExists.products.push(product._id);
    await categoryExists.save();

    return res.status(201).json({ success: true, message: "Producto creado exitosamente", product: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    // Obtener los parámetros de la petición para filtrar y ordenar los resultados
    const { filter, sort, limit, fields } = req.query;

    // Obtener el número de página y el número de elementos por página a mostrar
    const page = parseInt(req.query.page) || 1;
    const limitPerPage = parseInt(req.query.limit) || 10;

    // Definir el número total de elementos a mostrar en la paginación
    const totalElements = await Product.find(filter).countDocuments();

    // Calcular el número total de páginas a mostrar en la paginación
    const totalPages = Math.ceil(totalElements / limitPerPage);

    // Definir el índice del primer elemento a mostrar en la paginación
    const startIndex = (page - 1) * limitPerPage;

    // Definir el índice del último elemento a mostrar en la paginación
    const endIndex = page * limitPerPage;

    // Obtener los productos filtrados, ordenados, limitados y con los campos especificados
    let products = await Product.find(filter)
      .sort(sort ? sort : 'createdAt')
      .limit(limit ? limit : 10)
      .select(fields ? fields.split(',').join(' ') : '');

    // Aplicar la paginación al resultado anteriormente obtenido
    products = products.slice(startIndex, endIndex);

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay productos disponibles" });
    }

    // Enviar respuesta con los productos obtenidos y los datos de la paginación
    return res
      .status(200)
      .json({
        success: true,
        count: products.length,
        products: products,
        pagination: { page: page, totalPages: totalPages },
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !productId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const productExists = await Product.findById(productId);

    if (!productExists) {
      return res
        .status(404)
        .json({ message: "No se encontró el producto" });
    }
    return res.status(200).json({ success: true, product: productExists });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Controller para actualizar un producto por su ID
export const updateProductById = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !productId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  const { name, description, price, images, colors, tags, brand, stock } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "El nombre del producto es obligatorio" });
  }

  if (!description) {
    return res
      .status(400)
      .json({ message: "La descripción es obligatoria" });
  }

  if (!price) {
    return res
      .status(400)
      .json({ message: "El precio es obligatorio" });
  }

  if (price < 0) {
    return res.status(400).json({
      message: "El precio no puede ser negativo",
    });
  }

  if (images.length > 5) {
    return res
      .status(400)
      .json({ message: "El número máximo de imágenes es 5" });
  }

  if (!brand) {
    return res
      .status(400)
      .json({ message: "La marca es obligatoria" });
  }

  if (!stock) {
    return res
      .status(400)
      .json({ message: "El stock es obligatorio" });
  }

  if (stock < 0) {
    return res.status(400).json({
      message: "El stock no puede ser negativo",
    });
  }

  if (!Number.isInteger(stock)) {
    return res.status(400).json({
      message: "El stock debe ser un número entero",
    });
  }

  try {
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "El producto no existe" });
    }

    let slug = slugify(name);

    const productData = {
      name,
      slug,
      description,
      price,
      images,
      colors,
      tags,
      brand,
      stock,
    }

    const updateProduct = await productExists.updateOne(productData);

    return res.status(200).json({ success: true, message: "Producto actualizado exitosamente", product: updateProduct });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Eliminar un producto por ID
export const deleteProductById = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !productId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const productExists = await Product.findById(productId);

    if (!productExists) {
      return res.status(404).json({
        message: "El producto no existe",
      });
    }

    const categoryExists = await Category.findById(productExists.category);
    if (!categoryExists) {
      return res.status(404).json({
        message: "La categoria no existe",
      });
    }

    if (productExists.ratings.length > 0) {
      await Rating.deleteMany({ product: productExists._id });
    }

    categoryExists.products.remove({ product: productExists._id });
    
    await categoryExists.save();

    await productExists.deleteOne({ _id: productId });

    return res.status(200).json({
      success: true,
      message: "Producto eliminado exitosamente",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para obtener todos los productos de una categoría específica
export const getProductsByCategory = async (req, res) => {
  const category = req.params.category;

  if (!req.params || !category) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }
  
  try {
    const products = await Product.find({ category });

    if (!products) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    return res
      .status(200)
      .json({ success: true, count: products.length, products: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const getProductosByTag = async (req, res) => {
  const tag = req.params.tag;

  if (!req.params || !tag) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const products = await Product.find({ tags: tag });

    if (!products) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    return res
      .status(200)
      .json({ success: true, count: products.length, products: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const getProductosByColor = async (req, res) => {
  const color = req.params.color;

  if (!req.params || !color) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const products = await Product.find({ colors: color });

    if (!products) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    return res
      .status(200)
      .json({ success: true, count: products.length, products: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const getProductosByBrand = async (req, res) => {
  const brand = req.params.brand;

  if (!req.params || !brand) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const products = await Product.find({ brand });

    if (!products) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    return res
      .status(200)
      .json({ success: true, count: products.length, products: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const getProductosByPriceRange = async (req, res) => {
  const minPrice = req.params.minPrice;
  const maxPrice = req.params.maxPrice;

  if (!req.params || !minPrice || !maxPrice) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const products = await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });

    if (!products) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    return res
      .status(200)
      .json({ success: true, count: products.length, products: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const getProductosByKeyword = async (req, res) => {
  const keyword = req.params.keyword;

  if (!req.params || !keyword ) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const products = await Product.find({ $or: [{ name: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }] });

    if (!products) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    return res
      .status(200)
      .json({ success: true, count: products.length, products: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};