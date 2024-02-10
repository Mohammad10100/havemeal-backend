const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        plans:[
            {
                type:mongoose.Schema.Types.ObjectId,
                required:true,
            }
        ]
    },{ timestamps: true }
)

module.exports = mongoose.model("Category", categorySchema);