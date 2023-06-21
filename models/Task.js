const mongoose= require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const todoSchema = new mongoose.Schema({
    task: { required: true, type: String },
    user:{ type:ObjectId,ref: 'User' }},
    {timestamps:true}
)

module.exports = ToDo = mongoose.model('Task', todoSchema)