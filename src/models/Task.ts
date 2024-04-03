import mongoose, { Schema, Document } from "mongoose";

interface Task extends Document {
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<Task>("Task", TaskSchema);
