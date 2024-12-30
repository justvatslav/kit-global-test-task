import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['New', 'In Progress', 'Completed'], default: 'New' },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  createdAt: { type: Date, default: Date.now },
});
