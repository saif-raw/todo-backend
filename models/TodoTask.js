const mongoose = require('mongoose');
const uid = require('uniqid');
const todoTaskSchema = new mongoose.Schema({
taskId : {
    type : String,
    default : uid(),
    required : true,
    unique : true
},

task: {
type: String,
required: true
},

date: {
type: Date,
default: Date.now
}
})
module.exports = mongoose.model('Task',todoTaskSchema);