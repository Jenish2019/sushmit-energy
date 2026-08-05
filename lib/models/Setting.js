import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'Sushmit Energy' },
    siteEmail: { type: String, default: '' },
    sitePhone: { type: String, default: '' },
    address: { type: String, default: '' },
    bannerSlides: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
