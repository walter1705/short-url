import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import { required } from '../env.js';

const MONGO_URI = required('MONGO_URI');

export const connectToMongo = async () => {
  try {
    console.log('Connecting to mongo database...');

    const uri = MONGO_URI;

    await mongoose.connect(uri);
    console.log('Connected sucessfully with mongo database!');
  } catch (e: unknown) {
    console.error('Database error.');
  }
};
