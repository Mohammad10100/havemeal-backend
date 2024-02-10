const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        tokenCount: {
            type: Number,
            required:true,
		},
		startDate: {
            type: Date,
            required:true,
		},
		endDate: {
            type: Date,
			required: true,
		},
    },{ timestamps: true }
)

module.exports = mongoose.model("Subscription", subscriptionSchema);