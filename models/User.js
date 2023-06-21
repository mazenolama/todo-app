const mongoose= require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    email: { required: true, type:String },
    password:{ required: true,type : Array },
    tasks: [{ type:ObjectId,ref: 'Task' }]},
    {timestamps:true}
)
module.exports = User = mongoose.model('User', userSchema)