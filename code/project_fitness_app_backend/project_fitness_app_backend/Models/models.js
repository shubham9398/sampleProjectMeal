import mongoose from 'mongoose';

//Database Schema
const TodoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
     
},
{ timestamps: false, versionKey:false}
);

const todoModel = mongoose.model("Todo", TodoSchema);

//Export todoModel
export default todoModel;
