const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        category:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category'
            }
        ],

        // TODO: food will contain an object, with date and item, so that respective item will be available on that day
        // food:[
        //         {
        //             type: Date,
        //         },
        //         {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: 'Item'
        //         }
        // ],
        bullets:[
            {
                type:String,
            }
        ],
		numberOfDays: {
            type: Number,
            required:true,
		},
    },{ timestamps: true }
)

module.exports = mongoose.model("Menu", menuSchema);