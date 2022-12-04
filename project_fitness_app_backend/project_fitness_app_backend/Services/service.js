import { request } from 'express';
import mealModel from '../Models/mealModel.js';
import todoModel from '../Models/models.js';
import workoutModel from '../Models/workoutModel.js';

//Service to find all todos
export const findallWorkout=async(req) =>{
    console.log("PARAMS",req.params)
    const allWorkout= await workoutModel.find({username:req.query.username, date:req.query.date});
    console.log(allWorkout)
    return allWorkout;
};


//Service to add new todo to the list
export const addNewUser=async(req)=>{
    console.log(req.body)
    let userDuplicate = await todoModel.findOne({username:req.body.username});
    if(userDuplicate){
        let resp={loginstatus:"Already exists", username:userDuplicate.username}
        return resp;
    }
    const user = new todoModel(req.body);
    return (await user.save());
}

export const checkLogin=async(req)=>{
    console.log("ddsds"+req.body.username)
    let user = await todoModel.findOne({username:req.body.username, password:req.body.password}).exec();
    
    if(!user){
        const res={loginstatus:"Account doesn't exist"}
        return res
    }
    if(user.username==req.body.username && user.password==req.body.password){
       console.log("TRUUUUUUEEEE")
       let resp={loginstatus:"Sucessful", username:req.body.username}
        return resp
    }
    const loginFailureresp={loginstatus:"Failed", username:req.body.username}
    return loginFailureresp
}

export const addWorkout=async(req)=>{
    console.log(req.body)
    let workout = new workoutModel(req.body);
    return (await workout.save());
}

export const updateWorkout=async(req)=>{
    console.log(req.body)
         let workout = await workoutModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        ).exec()
        console.log("aedfsdfsd",workout)
        return workout

        }

export const deleteWorkout= async(req,res)=>{
    try{
        console.log(req.param.id);
    let deletedWorkout= await workoutModel.findByIdAndDelete(req.params.id).exec();
    console.log("Deleteddddd",deletedWorkout)
    }
    catch(err){
        console.log("Error",err)
    }
    // .then(function(){
    //     res.send("Deleted "+ req.params.id)
    //     console.log("Data deleted"); // Success
    // }).catch(function(error){
    //     console.log(error); // Failure
    // });
}


// -----------------------------------------------------------------------


export const deleteMeal= async(req,res)=>{
    try{
    let deletedMeal= await mealModel.deleteOne({_id: req.params.id })
    console.log("Deleteddddd",deletedMeal)
    }
    catch(err){
        console.log("Error",err)
    }
}


export const updateMeal=async(req)=>{
    console.log(req.body)
         let meal = await mealModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        ).exec()
        console.log("meal update",meal)
        return meal

        }


export const addMeal=async(req)=>{

        console.log("insde add meal")


        console.log(req.body)
        let meal = new mealModel(req.body);
        return (await meal.save());
        }


export const findallMeals=async(req) =>{
        console.log("PARAMS",req.params)
        const allMeals= await mealModel.find({username:req.query.username, date:req.query.date});
        console.log(allMeals)
        return allMeals;
                        };
                        














// export const updateTodoService=async(req,res)=>{ const todo = todoModel.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {new: true},
//     // the callback function
//     (err, todo) => {
//     // Handle any possible database errors
//         if (err) return res.status(500).send(err);
//         return res.send(todo);
//     }

// )}

// export const deleteTodoService= async(req,res)=>{
//     todoModel.deleteOne({_id: req.params.id }).then(function(){
//         res.send("Deleted "+ req.params.id)
//         console.log("Data deleted"); // Success
//     }).catch(function(error){
//         console.log(error); // Failure
//     });
// }