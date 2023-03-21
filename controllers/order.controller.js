import Order from "../models/Order.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Address from "../models/Address.js";
import Product from "../models/Product.js";

import {
  PAYPAL_API_SANDBOX,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} from "../config/config.js";

async function generateAccessToken() {
  const auth = Buffer.from(
    PAYPAL_API_CLIENT + ":" + PAYPAL_API_SECRET
  ).toString("base64");
  const response = await fetch(`${PAYPAL_API_SANDBOX}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

export const createOrder = async (req, res) => {
  try {
    const user = req.user._id;

    const address = await Address.findOne({ user, isDefault: true });

    if (!address) {
      return res.status(404).json({ message: "Direccion no válida o no existe" });
    }

    const cart = await Cart.findOne({ user });

    let products = cart.products.filter((product) => product.selected);

    const orderData = {
      user,
      shippingAddress: address,
      products: products,
      total: cart.total,
    };

    const order = await Order.create(orderData);

    const paymentIntent = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "MXN",
            value: order.total,
          },
        },
      ],
      application_context: {
        brand_name: "JAHAZIEL E-COMMERCE",
        locale: "en-US",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `http://localhost:3000/api/v1/order/capture`,
        cancel_url: `http://localhost:3000/api/v1/order/cancel`,
      },
    };

    const accessToken = await generateAccessToken();

    const response = await fetch(`${PAYPAL_API_SANDBOX}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(paymentIntent),
    });

    const data = await response.json();

    await order.updateOne({ paymentIntent, paymentId: data.id });

    return res
      .status(201)
      .json({
        success: true,
        message: "Pedido creado Pendiente de Pago",
        data,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const captureOrder = async (req, res) => {
  try {
    const token = req.query.token;
    
    const accessToken = await generateAccessToken();

    const response = await fetch(
      `${PAYPAL_API_SANDBOX}/v2/checkout/orders/${token}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    const user = req.user._id;

    const order = await Order.findOne({ user, paymentId: token });

    let cart = await Cart.findOne({ user });
    
    let update = cart.products.map((product) => {
      return {
        updateOne: {
          filter: { _id: product.product._id },
          update: {
            $inc: { stock: -product.quantity, sold: +product.quantity },
          },
        },
      };
    });

    const updated = await Product.bulkWrite(update, {});

    const paidOrder = await order.updateOne({ status: "Pagado" });

    return res
      .status(200)
      .json({ success: true, message: "Pedido Pagado", data });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const token = req.query.token;

    const accessToken = await generateAccessToken();

    const response = await fetch(
      `${PAYPAL_API_SANDBOX}/v1/checkout/orders/${token}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    const user = req.user._id;

    const order = await Order.findOne({ user, paymentId: token });

    const orderCanceled = await order.updateOne({ status: "Cancelado" });

    return res
      .status(200)
      .json({ success: true, message: "Pedido Cancelado", data });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const getOrderByUserId = async (req, res) => {
  try {
    const user = req.params.id;
    const order = await Order.find({ user }).populate('user').populate('shippingAddress').populate("products.product");
    return res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const user = req.user._id;
    const orders = await Order.find({ user }).populate('user').populate('shippingAddress').populate("products.product");
    return res.status(200).json({ success: true, count: orders.length, orders });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('shippingAddress').populate("products.product");
    return res.status(200).json({ success: true, count: orders.length, orders });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const user = req.params.id;
    const token = req.query.token
    const status = req.body.status;
    const order = await Order.findOne({ user: user, paymentId: token });
    const updateOrder = await order.updateOne({ status });

    return res.status(200).json({ success: true, message: "Dirección actualizada exitosamente", order: updateOrder });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};