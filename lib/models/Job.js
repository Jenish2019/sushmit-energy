import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String, default: '' },
    location: { type: String, default: '' },
    type: { type: String, default: 'Full-Time' },
    deadline: { type: String, default: '' },
    description: { type: String, default: '' },
    requirements: { type: Array, default: [] },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
