import mongoose from 'mongoose';

//Database Schema
const WorkoutSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      duration: {
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

const workoutModel = mongoose.model("Workout", WorkoutSchema);

//Export workoutModel
export default workoutModel;
