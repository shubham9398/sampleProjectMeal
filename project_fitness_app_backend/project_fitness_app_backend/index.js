
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//import {update,deletetodo, signup, login, workout} from './Controllers/controller.js'
import {signup, login, workout, patchWorkout, deleteW, allWorkouts, allMeals, patchMeal, deleteM, meal} from './Controllers/controller.js'

import express from 'express';
import cors from 'cors';

const app= express();


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 



const PORT= 5001;


//Connecting to database
mongoose.connect('mongodb://localhost:27017/Workoutdb');


app.use(bodyParser.json());
app.post('/signup',signup);
app.post('/login',login);
app.get('/getWorkout',allWorkouts)

app.post('/workout',workout);
app.patch('/updateWorkout/:id',patchWorkout)
app.delete('/deleteWorkout/:id',deleteW)
// app.patch('/update-todo/:id',update)
// app.delete('/delete/:id',deletetodo)

app.get('/getMeal',allMeals)

app.post('/meal', meal);
app.patch('/updateMeal/:id',patchMeal)
app.delete('/deleteMeal/:id',deleteM)




app.listen(PORT, ()=> console.log(`Server running on port: http://localhost:${PORT}`) );

