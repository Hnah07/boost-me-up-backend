import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IEntry extends mongoose.Document {
  content: string;
  _originalContent: string; // Temporary field for storing original content
  user: mongoose.Types.ObjectId;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const entrySchema = new mongoose.Schema<IEntry>(
  {
    content: {
      type: String,
      required: true,
      get: function (this: IEntry) {
        // Return the original content when getting
        return this._originalContent;
      },
      set: function (this: IEntry, value: string) {
        // Store the original content in a temporary field
        this._originalContent = value;
        // Return the hashed content to be stored in the database
        return bcrypt.hashSync(value, 10);
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true }, // Include getters when converting to JSON
    toObject: { getters: true }, // Include getters when converting to plain object
  }
);

// Add an index to optimize queries by user
entrySchema.index({ user: 1 });

const Entry = mongoose.model<IEntry>("Entry", entrySchema);

export default Entry;
