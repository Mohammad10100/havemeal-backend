const mongoose = require("mongoose")
const Subscription = require('./Subscription')
const Category = require('./Category')

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
        },
        contactNumber:{
            type:Number,
            trim:true,
        },
        accountType:{
            type:String,
            enum:["Admin","Buyer","DeliveryGuy",],
            trim:true,
        },

        // TODO: address can be string or coordinate based
        address:{
            type:String,
            required:true,
        },
        category:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category'
            }
        ],
        password:{
            type:String,
            required:true,
        },
        token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
		image: {
			type: String,
			required: true,
		},
        existingSubscriptions:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subscription'
            }
        ],
        plans:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Plan'
            }
        ]
    },{ timestamps: true }
)

module.exports = mongoose.model("User", userSchema);