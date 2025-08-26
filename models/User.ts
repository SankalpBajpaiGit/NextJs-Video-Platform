import mongoose, { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

// The interface should extend Mongoose's Document type
export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Your pre-save hook for hashing is correct and will be used.
userSchema.pre<IUser>("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;