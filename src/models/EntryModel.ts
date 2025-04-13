import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IEntry extends mongoose.Document {
  content: string;
  user: mongoose.Types.ObjectId;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  _originalContent?: string;
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
    toJSON: {
      transform: function (doc, ret) {
        if (doc._originalContent) {
          ret.content = doc._originalContent;
        }
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        if (doc._originalContent) {
          ret.content = doc._originalContent;
        }
        return ret;
      },
    },
  }
);

// Add an index to optimize queries by user
entrySchema.index({ user: 1 });

// Pre-save middleware to hash the content
entrySchema.pre("save", function (next) {
  if (this.isModified("content")) {
    const originalContent = this.content;
    this._originalContent = originalContent;
    this.content = bcrypt.hashSync(originalContent, 10);
  }
  next();
});

// Post-find middleware to restore original content
entrySchema.post("find", function (docs) {
  docs.forEach((doc: any) => {
    if (doc._originalContent) {
      doc.content = doc._originalContent;
    }
  });
});

entrySchema.post("findOne", function (doc: any) {
  if (doc && doc._originalContent) {
    doc.content = doc._originalContent;
  }
});

const Entry = mongoose.model<IEntry>("Entry", entrySchema);

export default Entry;
