import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subtitle: { type: String, default: '' },
    slug: { type: String, required: true, unique: true, trim: true },
    capacity: { type: String, default: '' },
    location: { type: String, default: '' },
    status: { type: String, default: 'Under Development' },
    startDate: { type: String, default: '' },
    type: { type: String, default: 'Run-of-River' },
    river: { type: String, default: '' },
    annualEnergy: { type: String, default: '' },
    specs: {
      type: [
        new mongoose.Schema(
          { label: { type: String, default: '' }, value: { type: String, default: '' } },
          { _id: false }
        ),
      ],
      default: [],
    },
    overview: { type: String, default: '' },
    features: [{ type: String }],
    image: { type: String, default: '' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
