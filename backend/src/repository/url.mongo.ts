import mongoose, { Schema } from 'mongoose';
import { IUrl } from '../model/url.js';

const urlMongoSchema = new Schema<IUrl>(
  {
    originalUrl: { type: String, required: true, index: false },
    shortCode: { type: String, required: true, unique: true, index: true },
    customCode: { type: String, unique: true, sparse: true, index: true },
    totalClicks: { type: Number, default: 0 },
    lastAccessedAt: { type: Date, default: null },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true },
);

urlMongoSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const URLModel = mongoose.model<IUrl>('Url', urlMongoSchema);

export default class UrlMongoRepository {
  async getAllURLs(
    page: number = 1,
    limit: number = 20,
  ): Promise<{ data: IUrl[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      URLModel.find().skip(skip).limit(limit).lean(),
      URLModel.countDocuments(),
    ]);
    return { data, total, page, limit };
  }

  async getByShortCode(shortCode: string): Promise<IUrl | null> {
    return await URLModel.findOne({ shortCode }).lean();
  }

  async getByCustomCode(customCode: string): Promise<IUrl | null> {
    return await URLModel.findOne({ customCode }).lean();
  }

  async createURL(data: IUrl): Promise<IUrl> {
    const url = new URLModel(data);
    return await url.save();
  }

  async shortCodeExist(shortCode: string): Promise<boolean> {
    return !!(await URLModel.exists({ shortCode }));
  }

  async customCodeExist(customCode: string): Promise<boolean> {
    return !!(await URLModel.exists({ customCode }));
  }

  async updateAnalytics(shortCode: string): Promise<void> {
    URLModel.findOneAndUpdate(
      { shortCode },
      { $inc: { totalClicks: 1 }, $set: { lastAccessedAt: new Date() } },
      { new: true },
    )
      .lean()
      .catch(() => {});
  }

  async deleteByShortCode(shortCode: string): Promise<boolean> {
    const result = await URLModel.findOneAndDelete({ shortCode });
    return !!result;
  }
}
