import mongoose from "mongoose";



//Database Schema
const MealSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
        nutrients: {
        type: String,
        required: true,
      },
      calories: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      }
     
},
{ timestamps: false, versionKey:false}
);

const mealModel = mongoose.model("Meal", MealSchema);

//Export workoutModel
export default mealModel;
