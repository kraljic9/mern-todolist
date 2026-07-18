import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    }, 

    isCompleted: {
        type: Boolean,
        default: false,
    
    },
        userId: {
          type: String,
          required:true,  
        },
    },
    {
        timestamps: true
    }
)

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
export default Task