import mongoose from "mongoose";

interface IEntry extends mongoose.Document {
  content: string;
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
  }
);

// Add an index to optimize queries by user
entrySchema.index({ user: 1 });

const Entry = mongoose.model<IEntry>("Entry", entrySchema);

export default Entry;
