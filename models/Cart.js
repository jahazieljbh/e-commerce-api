import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la carrito es obligatorio"],
      unique: true,
      minlength:[3, 'El nombre debe tener al menos 3 caracteres'], 
      maxlength:[50, 'El nombre no puede exceder los 50 caracteres'] 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;