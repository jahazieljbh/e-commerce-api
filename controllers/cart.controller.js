import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const createCart = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "El nombre del carrito es obligatorio" });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "El nombre debe tener al menos 3 caracteres" });
  }

  if (name.length > 50) {
    return res
      .status(400)
      .json({ message: "El nombre no puede exceder los 50 caracteres" });
  }

  try {
    const user = req.user._id;
    const userExists = await User.findById(user);
    const carts = await Cart.find({ user: user });

    if (carts.some((cart) => cart.name === `Carrito de ${name}`)) {
      return res
        .status(409)
        .json({ message: "Ya existe un carrito registrado con ese nombre" });
    }

    const cartData = {
      name: `Carrito de ${name}`,
      user: userExists._id,
    };

    const cart = await Cart.create(cartData);

    userExists.cart.push(cart);
    await userExists.save();

    return res.status(201).json({
      success: true,
      message: "Carrito creado exitosamente",
      cart: cart,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const deleteCartById = async (req, res) => {
  const cartId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({ message: "ID no válido" });
  }

  if (!req.params || !cartId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const user = req.user._id;
    const userExists = await User.findById(user);
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    if (!cart.user.equals(user)) {
      return res.status(401).json({
        message: "No tienes permiso para eliminar este carrito",
      });
    }

    // Verifica si el carrito tiene productos asociados antes de eliminarlo
    if (cart.products && cart.products.length > 0) {
      return res.status(409).json({
        message:
          "El carrito no puede ser eliminado porque tiene productos asociados",
      });
    }

    userExists.cart.remove(cart._id);
    await userExists.save();

    await cart.deleteOne({ _id: cartId });

    return res
      .status(200)
      .json({ success: true, message: "Carrito eliminado exitosamente" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const getCartById = async (req, res) => {
  const cartId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({ message: "ID no válido" });
  }

  if (!req.params || !cartId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const user = req.user._id;
    const cart = await Cart.findById(cartId).populate("products.product");

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    if (!cart.user.equals(user)) {
      return res
        .status(401)
        .json({ message: "No tienes permiso para ver esta carrito" });
    }

    return res.status(200).json({ success: true, cart: cart });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const getCarts = async (req, res) => {
  try {
    const user = req.user._id;
    const carts = await Cart.find({ user: user }).populate("products.product");

    if (!carts || carts.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron carritos para este usuario" });
    }

    return res
      .status(200)
      .json({ success: true, count: carts.length, carts: carts });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const updateCartById = async (req, res) => {
  const cartId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({ message: "ID no válido" });
  }

  if (!req.params || !cartId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "El nombre del carrito es obligatorio" });
  }

  try {
    const user = req.user._id;
    const cartExists = await Cart.findById(cartId);

    if (!cartExists) {
      return res.status(404).json({ message: "No se encontró el carrito" });
    }

    if (!cartExists.user.equals(user)) {
      return res.status(401).json({
        message: "No tienes permiso para modificar este carrito",
      });
    }

    const carts = await Cart.find({ user: user });

    if (!carts || carts.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron carritos para este usuario" });
    }

    if (carts.some((cart) => cart.name === name)) {
      return res
        .status(409)
        .json({ message: "Ya tienes un carrito registrado con ese nombre" });
    }

    const cartData = {
      name,
    };

    const updateCart = await cartExists.updateOne(cartData);

    return res.status(200).json({
      success: true,
      message: "Carrito actualizado exitosamente",
      cart: updateCart,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para agregar productos al carrito del usuario logeado
export const addProductToCart = async (req, res) => {
  try {
    const user = req.user._id; // Obtenemos el id del usuario logeado
    const productId = req.params.id; // Obtenemos el id del producto
    const { color } = req.body; // Obtenemos el color del producto

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    if (!req.params || !productId) {
      return res.status(400).json({ message: "Parámetros no válidos" });
    }

    // Verificamos que el usuario exista en la base de datos
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ message: "El usuario no existe" });
    }
    // Obtenemos los datos del producto a agregar al carrito
    let quantity = 1;

    // Verificamos que el producto exista en la base de datos
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "El producto no existe" });
    }

    if (!productExists.colors.includes(color)) {
      return res
        .status(404)
        .json({ message: `El color ${color} del producto no esta disponible` });
    }

    // Verificamos si el usuario ya tiene un carrito creado en la base de datos
    let cartExists = await Cart.findOne({ user: user });

    if (!cartExists) {
      // Si no hay un carrito creado para el usuario logeado creamos uno nuevo con los datos del producto a agregar
      let cartData = {
        user: user,
        name: `Carrito de ${userExists.firstname}`,
        products: [
          {
            product: productExists._id,
            price: productExists.price,
            color,
            quantity,
            subtotal: productExists.price * quantity,
          },
        ],
        total: productExists.price * quantity,
      };

      cartExists = await Cart.create(cartData);

      return res.status(201).json({
        success: true,
        message: "Producto agregado al carrito exitósamente",
        cart: cartExists,
      });
    } else {
      // Si ya hay un carrito creado para el usuario logeado verificamos si ya contiene el mismo producto y actualizamos los datos correspondientes

      let isProductInCart = false; // Variable para verificar si el producto ya está en el carrito

      for (let i = 0; i < cartExists.products.length; i++) {
        // Recorremos todos los elementros del arreglo products dentro del objeto cart para verificar si ya está el mismo producto
        if (
          cartExists.products[i].product.equals(productExists._id) &&
          cartExists.products[i].color === color
        ) {
          // Si encontramso que ya está entonces actualizamso su cantidad y su precio total
          cartExists.products[i].quantity += quantity;
          cartExists.products[i].subtotal += productExists.price * quantity;

          isProductInCart = true;

          break;
        }
      }

      if (!isProductInCart) {
        // Si no encontramso que esté entonces le agregamso un nuevo elementro al arreglo products dentro del objeto cart con los datps correspondientes al nuevo productp a agregar

        cartExists.products.push({
          product: productExists._id,
          price: productExists.price,
          color,
          quantity: quantity,
          subtotal: productExists.price * quantity,
        });
      }

      cartExists.total += productExists.price * quantity; // Actualizamso también el precio total del carrito sumandole la cantidad total del nuevo prodcutp aagregado al mismp

      await cartExists.save(); // Guardamso los cambios realizados en la base de datps

      return res.status(200).json({
        success: true,
        message: "Producto actualizado exitósamente",
        cart: cartExists,
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para remover productos del carrito del usuario logeado
export const removeProductFromCart = async (req, res) => {
  try {
    const user = req.user._id; // Obtenemos el id del usuario logeado
    const productId = req.params.id; // Obtenemos el id del producto

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    if (!req.params || !productId) {
      return res.status(400).json({ message: "Parámetros no válidos" });
    }

    // Obtener el carrito del usuario logeado
    const cart = await Cart.findOne({ user: user });

    // Si el carrito no existe, devolver un error
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Obtener el producto a remover del carrito
    const productToRemove = cart.products.find(
      (product) => product.id == productId
    );
    console.log(productToRemove);

    // Si el producto no existe en el carrito, devolver un error
    if (!productToRemove) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    // Remover el producto del carrito y actualizar los valores de total y cantidad de productos en el carrito
    const updatedProducts = cart.products.remove({
      id: productToRemove.id,
      name: productToRemove.name,
      description: productToRemove.description,
      price: productToRemove.price,
      quantity: productToRemove.quantity,
    });

    cart.products.push(updatedProducts);

    let total = 0;

    for (let i = 0; i < updatedProducts.length; i++) {
      total += updatedProducts[i].price * updatedProducts[i].quantity;
    }

    cart.total = total;

    await cart.save();

    // Devolver respuesta exitosa con los datos actualizados del carrito al cliente
    return res.status(200).json({
      success: true,
      message: "Producto removido exitosamente",
      cart: cart,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

//Controlador para obtener producto del carrito
export const getProductFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const user = req.user._id;
    const cartName = req.body.name;
    const cart = await Cart.findOne({ user: user, name: cartName });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "No hay productos en el carrito" });
    }

    // Obtener el producto específico del carrito
    const product = cart.products.find((product) => product.id === productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    return res.status(200).json({ success: true, product: product });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para obtener todos los productos del carrito
export const getAllProductsFromCart = async (req, res) => {
  try {
    const user = req.user._id;
    const cartName = req.body.name;
    const cart = await Cart.findOne({ user: user, name: cartName });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    let products = cart.products;

    if(products.length === 0){
      return res.status(404).json({ message: "Tu carrito está vacío" });
    }

    return res
      .status(200)
      .json({ success: true, count: products.length, products: products });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

//Controlador para modificar la cantidad de un producto
export const updateQuantity = async (req, res) => {
  try {
    const cartId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    if (!req.params || !cartId) {
      return res.status(400).json({ message: "Parámetros no válidos" });
    }

    const { productId, color, quantity } = req.body;

    if (!productId) {
      return res.status(404).json({ message: "El producto es requerido" });
    }

    if (!color) {
      return res
        .status(404)
        .json({ message: "El color del producto es requerido" });
    }

    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "La cantidad debe ser mayor o igual a 1" });
    }

    if (quantity > 10) {
      return res
        .status(400)
        .json({ message: "La cantidad no puede exceder los 10" });
    }

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    //Encontrar el producto dentro del carrito
    const productIndex = cart.products.findIndex(
      (product) => product.product == productId && product.color == color
    );

    //Verificar que el producto exista en el carrito
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    //Actualizar la cantidad del producto seleccionado desde el dropdown-button y actualizar subtotal y total del carrito si la propiedad selected es true

    cart.products[productIndex].quantity = quantity;

    const subtotal = cart.products[productIndex].price * quantity;

    cart.products[productIndex].subtotal = subtotal;

    let total = 0;

    cart.products.forEach((product) => {
      if (product.selected === true) {
        total += product.subtotal;
      }
    });

    cart.total = total;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cantidad actualizada con éxito",
      cart: cart,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para seleccionar y deseleccionar un producto desde un checkbox y calcular el total de acuerdo si esta seleccionado o deselecionado
export const selectProduct = async (req, res) => {
  try {
    const user = req.user._id;
    const productId = req.params.id;
    const color = req.body.color;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    if (!req.params || !productId) {
      return res.status(400).json({ message: "Parámetros no válidos" });
    }

    if (!color) {
      return res
        .status(404)
        .json({ message: "El color del producto es requerido" });
    }

    // Obtener el carrito de compras del usuario
    const cart = await Cart.findOne({ user: user });

    // Obtener el producto a seleccionar/deseleccionar del carrito de compras del usuario
    const productIndex = cart.products.findIndex(
      (product) => product.product == productId && product.color == color
    );

    //Verificar que el producto exista en el carrito
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    // Seleccionar/Deseleccionar el producto
    cart.products[productIndex].selected =
      !cart.products[productIndex].selected;

    // Calcular el precio total del carrito de compras
    let totalPrice = 0;

    cart.products.forEach((prod) => {
      if (prod.selected) {
        totalPrice += prod.subtotal;
      }
    });

    // Actualizar el precio total del carrito de compras
    cart.total = totalPrice;

    // Guardar los cambios en la base de datos
    await cart.save();

    // Enviar respuesta al cliente
    return res.status(200).json({ success: true, data: cart });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};
