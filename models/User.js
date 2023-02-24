import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: (props) => `${props.value} no es un correo electrónico válido`,
      },
    },
    mobile: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "es-MX");
        },
        message: (props) =>
          `${props.value} no es un número de teléfono válido en México`,
      },
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      trim: true,
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: Buffer,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
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
    process.env.JWT_SECRET || "default_secret_key"
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

// Middleware para encriptar la contraseña antes de guardarla en la base de datos
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
