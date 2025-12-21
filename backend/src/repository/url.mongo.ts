import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import urlSchema, { url } from '../model/url.js';
import { lowercase } from 'zod';

const urlMongoSchema = new Schema<url>(
  {
    url: {
      type: String,
      required: true,
      unique: false,
      lowercase: true,
      trim: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    timesVisited: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const URLModel = mongoose.model('url', urlMongoSchema);

export default class UrlMongoRepository {
  constructor() {}

  getAllURLs = async (): Promise<url[]> => {
    return await URLModel.find();
  };

  createURL = async ({ url, shortCode, timesVisited }: url) => {
    const save = URLModel.insertOne({ url, shortCode, timesVisited });
    return await save;
  };

  shortCodeExist = async ({ shortCode }: { shortCode: string }) => {
    return await URLModel.exists({ shortCode });
  };
}
