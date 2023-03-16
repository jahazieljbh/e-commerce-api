import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      price: {
        type: Number,
        ref: "Product.price",
        required: true
      },
      color: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min:[1,"La cantidad debe ser mayor o igual a 1"],
        max:[10,"La cantidad no puede exceder los 10"],
      },
      selected: {
        type: Boolean,
        required: true,
        default: true
      },
      subtotal: {
        type: Number,
        required: true
      },
    }
  ],
  total: {
    type: Number,
    required: true,
    default: 0
  },
  paymentIntent: {},
  paymentId: {
    type: String
  },
  status:{ 
    type: String, 
    enum : ['Pendiente', 'Cancelado', 'Pagado', 'Procesando', 'Enviado', 'Completado'], 
    default : 'Pendiente' 
  }
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;