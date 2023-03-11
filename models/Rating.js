import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "La calificación es obligatoria"],
      min: [1, "La calificación mínima es 1"],
      max: [10, "La calificación máxima es 10"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        "El comentario no puede tener más de 1000 caracteres",
      ],
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
