import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, default: 'Annual' },
    fileUrl: { type: String, default: '' },
    date: { type: String, default: '' },
    description: { type: String, default: '' },
    size: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
