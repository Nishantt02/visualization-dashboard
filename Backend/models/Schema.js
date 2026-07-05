// models/Data.js
import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  city: String,
  start_year: Number,
  impact: mongoose.Schema.Types.Mixed,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
});

export default mongoose.model("Data", dataSchema);