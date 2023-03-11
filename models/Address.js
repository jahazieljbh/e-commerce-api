import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressName: {
      type: String,
      required: [true, "El nombre de la dirección es obligatorio"],
      trim: true
    },
    addressLine1: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      trim: true
    },
    addressLine2: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      required: [true, "La ciudad es obligatoria"],
      trim: true
    },
    state: {
      type: String,
      required: [true, "El estado es obligatorio"],
      trim: true
    },
    country: {
      type: String,
      required: [true, "El país es obligatorio"],
      trim: true
    },
    zipcode: {
      type: String,
      required: [true, "El código postal es obligatorio"],
      trim: true
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
