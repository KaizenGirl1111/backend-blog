const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String },
    priority: {
      type: String,
      required: true,
      enum: ["High", "Medium", "Low"],
      default: "medium",
    },
    status:{
        type:String,
        required:true,
        enum:["Pending","In Progress","Completed"],
        default:"Pending"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    //  timestamp:{type:Date}
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
