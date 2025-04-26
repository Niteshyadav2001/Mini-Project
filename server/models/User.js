import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// export const M_U=process.env.MONGO_URI;

// mongoose
//   .connect(M_U)
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.error("DB connection error:", err));

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      default: 1000,
    },
    expense: {
      type: Number,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
