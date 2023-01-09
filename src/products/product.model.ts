import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Javascript type (uppercase)
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface Product extends mongoose.Document {
  id: string; // Typescript type (lowercase)
  title: string;
  description: string;
  price: number;
}
