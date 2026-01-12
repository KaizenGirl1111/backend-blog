const Task = require("../model/taskModel")
const User = require("../model/userModel")
const addATask = async (req,res)=>{
    try{
    console.log(req)
    const newTask = new Task({...req.body,"userId":req.user._id})
    await newTask.save()
    res.status(201).send(newTask)
    }
    catch(e){
       res.status(400).send({message:"Couldn't add task,try again"})
    }
}

const deleteATask = async (req,res)=>{
    try{
         console.log(req)
        const userId = req.user._id
        const id = req.params.id
        const task = await Task.findOneAndDelete({_id:id,userId})
        res.status(200).send({
            message:"Task deleted successfully",
            task
        })
    }
    catch(e){
        res.status(400).send({
            message:"Error in deleting task",
            error:e
        })
    }
}

const updateATask = async(req,res)=>{
    try{
    const userId =req.user._id
    const id = req.params.id
    const task =await Task.findOneAndUpdate({_id:id,userId},req.body,{new:true,runValidators:true})
    res.send({message:"Task updated successfully",task})
    }
    catch(e){
          res.send({
            message:"Error in updating task",
            error:e
        })
    }
}

const getATask = async(req,res)=>{
    console.log(req.params.id)
    try{
        const userId = req.user._id
        const id = req.params.id
        const task = await Task.findById({_id:id,userId})

        if(task)res.status(200).send(task)
        else res.status(404).send({"message":"Task not found"})
    }
    catch(e){
        res.status(500).send({
            message:"Error in fetching task",
            e
        })
    }
}

const getTasks = async(req,res)=>{
   try{
    const id = req.user._id
    console.log(id)
  const tasks =await User.findById(id).populate("taskTable")
    console.log(tasks)
    res.status(200).send(tasks.taskTable)
   }
   catch(e){
         res.status(400).send({
             message:"Error in fetching tasks",
             e
         })
  }
}

module.exports = {addATask,deleteATask,updateATask,getATask,getTasks}