import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// usar para impementar 2FA
//import speakeasy from "speakeasy";
//import qrcode from "qrcode";

import {JWT_SECRET} from "../config/config.js"

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true
    },
    lastname: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true
    },
    mobile: {
      type: String,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "es-MX"),
        message: (props) =>
          `${props.value} no es un número de teléfono válido en México`
      }
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} no es un correo electrónico válido`
      }
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      trim: true,
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    avatar: {
      type: String,
      validate: {
        validator: function (value) {
          if (!value) {
            return true; // Permitir una cadena vacía o nula
          }
    
          const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
          const fileExtension = value.split(".").pop().toLowerCase();
    
          return allowedExtensions.includes(fileExtension);
        },
        message: (props) =>
          `${props.value} no es un formato de archivo de imagen válido. Los formatos permitidos son: jpg, jpeg, png y gif.`
      }
    },    
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    isBlocked: {
      type: Boolean,
      default: false
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "La cantidad debe ser mayor o igual a 1"]
        }
      }
    ],
    addresses: [
      {
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
        }
      }
    ],
    favoriteProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      }
    ],
  },
  {
    timestamps: true
  }
);

// Método para ocultar la información sensible del usuario
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Método para generar un token de autenticación para el usuario
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    JWT_SECRET, 
    { expiresIn: '1h'}
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Método para buscar un usuario por su correo electrónico y contraseña
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("No se pudo encontrar un usuario con estas credenciales");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  return user;
};

// Método para restablecer el password con expiración de 30 minutos
userSchema.methods.generatePasswordReset = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpiration = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

// Middleware para encriptar la contraseña antes de guardarla en la base de datos
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
