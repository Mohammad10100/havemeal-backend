const mongoose = require("mongoose")

const planSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        admin:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        category:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category'
            }
        ],
        instructions:
        [
            {
                type: String,
            }
        ],
        menu:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu'
            }
        ],
        status:{
            type:String,
            enum:['Draft', 'Published']
        },
        bullets:[
            {
                type:String,
            }
        ],
        tokenCount: {
            type: Number,
            required:true,
		},
		numberOfDays: {
            type: Number,
            required:true,
		},
    },{ timestamps: true }
)

module.exports = mongoose.model("Plan", planSchema);