import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ScoreSchema = new Schema({
    name: String, 
    subject: String,
    score: Number
  });
  
  const ScoreCard = mongoose.model('ScoreCard', ScoreSchema);
  
  export default ScoreCard;