const valit = require('valit')
const jwt = require('jsonwebtoken')
var ObjectId = require("bson-objectid");
const User = require('../models/User');
const Task = require('../models/Task')

const taskSchema = { task: valit.createField(valit.string,{required: true, min:3})}

exports.createTask = async (req , res)=>{
    let {task} = req.body;

    const token = req.headers['x-auth-token']
    // Get user id from token to add it to the task
    let user_id = await jwt.verify(token, process.env.PRIVATE_KEY).id;

    const user = await User.findById(user_id)
    if(!user) return res.status(404).json({result:'USER NOT FOUND !!'})

    let taskData = {task,user}

    //CHECK ON REQUESTED DATA IF VALIDATE OR NOT IN SCHEMA
    const errors = valit.validate(taskData, taskSchema)
    if(Object.keys(errors).length > 0 ) return res.status(400).send(errors)

    try { 
        data = await Task.insertMany(taskData);
        // Add task id to user tasks array
        await User.findByIdAndUpdate(user_id,  { $push: { tasks: data[0]._id } }, { new: true });
        res.send({result:"success", message : "New Task Has Been Created", data :{task: taskData.task,user_email:taskData.user.email} })
    } 
    catch (error) {
        return res.status(401).send({result: "Failed To Create New Task",error}) 
    }
}

exports.getSingleTask = async (req , res)=>{
    const {id} = req.params;
    if (!id || !ObjectId.isValid(id)){
        return res.status(404).json({message:"The id provided is not valid, " +  id});
    }

    let user_id = await jwt.verify(req.headers['x-auth-token'], process.env.PRIVATE_KEY).id;
    
    // Get task by id and user id to make sure that this task belongs to this user
    await Task.findOne({ $and: [{ _id: id }, { user: user_id }] })
    .populate({
        path: 'user',
        select: 'firstName lastName email',
    })
    .exec((error, task) => {
        if (error) {
            return res.status(500).json({error})
        }
        else if (!task) {
            return res.status(404).json({result:'No Task Was Found !!'})
        }
        else { 
            res.json({result:"success",data:{task:task.task,user_data:task.user}}) 
        }
    });
}

exports.deleteTask = async (req, res) => {
    const {id} = req.params;
    
    if (!id || !ObjectId.isValid(id)) {
        return res.status(404).json({message:"The id provided is not valid, " +  id});
    }
    // Get user id from token to find the task by id and user id
    let user_id = await jwt.verify(req.headers['x-auth-token'], process.env.PRIVATE_KEY).id;

    try {
        // Get task by id and user id to make sure that this task belongs to this user before deleting it
        const task = await Task.findOne({ _id: id, user: user_id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        // Task belongs to the specified user, proceed with deletion
        let data = await Task.findByIdAndDelete(id);
        // Remove task id from user tasks array
        await User.findByIdAndUpdate(user_id,  { $pull: { tasks: id } }, { new: true });

        res.json({ message: 'Task deleted successfully.',data });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task.', error });
    }

}

exports.updateTask = async (req, res) => {
    const {id} = req.params;
    const taskData = {task} = req.body

    let user_id = await jwt.verify(req.headers['x-auth-token'], process.env.PRIVATE_KEY).id;

    if (!id || !ObjectId.isValid(id)) return res.status(404).json({message:"The id provided is not valid, " +  id});
    
    const errors = valit.validate(taskData, taskSchema)
    if(Object.keys(errors).length > 0 ) return res.status(400).send(errors)
    
    try { 
        // Get task by id and user id to make sure that this task belongs to this user before updateing it
        task = Task.findOne({ $and: [{ _id: id }, { user: user_id }] })
        if (!task) {return res.status(404).json({ message: 'Task not found.' })}

        // Task belongs to the specified user, proceed with update
        data = await Task.findByIdAndUpdate({ _id: id },taskData)
        return res.send({result:"success", status:200 , message : "Task Has Been Updated", data : taskData})
    } 
    catch (error) { return res.status(401).send({result: "failed", status:401, error}) }
    
}