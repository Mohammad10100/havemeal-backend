const Plan = require("../models/Plan")
const Category = require("../models/Category")
const User = require("../models/User")
const { uploadToCloudinary } = require("../utils/imageUpload")

// Function to create a new Plan
exports.createPlan = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user._id


    // Get all required fields from request body
    let {
      name,
      description,
      price,
      category,
      status,
      tokenCount,
      numberOfDays,
      instructions: _instructions,
    } = req.body
    // Get thumbnail image from request files

    const thumbnail = req.files.thumbnailImage

    // Convert the tag and instructions from stringified Array to Array
    const instructions = JSON.parse(_instructions)

    // Check if any of the required fields are missing
    if (
      !name ||
      !description ||
      !price ||
      !thumbnail ||
      !category ||
      !tokenCount ||
      !numberOfDays ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }
    // Check if the user is an admin
    const adminDetails = await User.findById(userId, {
      accountType: "Admin",
    })

    if (!adminDetails) {
      return res.status(404).json({
        success: false,
        message: "Admin Details Not Found",
      })
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )

    // Create a new Plan with the given details
    const newPlan = await Plan.create({
      name:name,
      description:description,
      admin: adminDetails._id,
      price,
      tokenCount,
      numberOfDays,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })

    // Add the new Plan to the User Schema of the Admin
    await User.findByIdAndUpdate(
      {
        _id: adminDetails._id,
      },
      {
        $addToSet: {
          plans: newPlan._id,
        },
      },
      { new: true, upsert: true }
    )
    // Add the new Plan to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $addToSet: {
          plans: newPlan._id,
        },
      },
      { new: true, upsert: true  }
    )

    // Return the new Plan and a success message
    res.status(200).json({
      success: true,
      data: newPlan,
      message: "Plan Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the Plan
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create Plan",
      error: error.message,
    })
  }
}
// Edit Plan Details
exports.editPlan = async (req, res) => {
  try {
    const { planId } = req.body
    const updates = req.body
    const plan = await Plan.findById(planId)

    if (!plan) {
      return res.status(404).json({ error: "Plan not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      plan.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "instructions") {
          plan[key] = JSON.parse(updates[key])
        } else {
          plan[key] = updates[key]
        }
      }
    }

    await plan.save()

    const updatedPlan = await Plan.findOne({
      _id: planId,
    })
    // TODO: If admin details (admin plans array) change
      // .populate({
      //   path: "admin",
      //   populate: {
      //     path: "additionalDetails",
      //   },
      // })
      .populate("category")
      // TODO: If rating change
      // .populate("ratingAndReviews")
      // TODO: If menu change
      // .populate({
      //   path: "plan menu",
      //   populate: {
      //     path: "subMenu/item",
      //   },
      // })
      .exec()

    res.json({
      success: true,
      message: "Plan updated successfully",
      data: updatedPlan,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
// Get Plan List
exports.getAllPlans = async (req, res) => {
  try {
    const allPlans = await Plan.find(
      { status: "Published" },
      //TODO: if want to display only selected fields
      // {
      //   name: true,
      //   price: true,
      //   thumbnail: true,
      //   // admin: true,
      //   // ratingAndReviews: true,
      //   buyesEnrolled: true,
      // }
    )
      .populate("admin")
      .populate("category")
      .exec()

    return res.status(200).json({
      success: true,
      data: allPlans,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Plan Data`,
      error: error.message,
    })
  }
}

exports.getPlanDetails = async (req, res) => {
  try {
    const { planId } = req.body
    const PlanDetails = await Plan.findOne({
      _id: planId,
    })
      .populate("admin")
      .populate("category")
      // TODO: When populating reviews of the plan
      // .populate("ratingAndReviews")
      // TODO: When populating menus
      // .populate({
      //   path: "PlanContent",
      //   populate: {
      //     path: "subSection",
      //     select: "-videoUrl",
      //   },
      // })
      .exec()

    if (!PlanDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find Plan with id: ${planId}`,
      })
    }

    // TODO: Do not fetch a draft plan
    // if (PlanDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft Plan is forbidden`,
    //   });
    // }

    return res.status(200).json({
      success: true,
      data: {
        PlanDetails,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get a list of Plan for a given Admin
exports.getAdminPlans = async (req, res) => {
  try {
    // Get the admin ID from the authenticated user or request body
    const adminId = req.user._id

    // Find all Plans belonging to the admin
    const adminPlans = await User.findById(adminId)
    .populate("plans")
    .sort({ createdAt: -1 })
    // .exec()

    // Return the admin's Plans
    res.status(200).json({
      success: true,
      data: adminPlans,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin Plans",
      error: error.message,
    })
  }
}


// TODO: Draft a plan, in case you want to reuse it  OR you can EDIT the Plan status
// Delete the Plan
exports.deletePlan = async (req, res) => {
  try {
    const { planId } = req.body
    const adminId = req.user._id

    // Find the Plan
    const plan = await Plan.findById(planId)
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" })
    }

    // TODO: Unenroll buyers from plan
    // Unenroll buyers from the Plan
    // const buyersEnrolled = plan.buyersEnrolled
    // for (const buyerId of buyersEnrolled) {
    //   await User.findByIdAndUpdate(buyerId, {
    //     $pull: { plans: planId },
    //   })
    // }

    
    // Remove plan from categories
    const categories = plan.category
    for (const category of categories) {
      await Category.findByIdAndUpdate(category, {
        $pull: { plans: planId } }
      );
    }

    // Remove plan from admin's plans
    await User.findByIdAndUpdate(
        adminId,
        { $pull: { plans: planId } }
    );

    // Delete the Plan
    await Plan.findByIdAndDelete(planId)

    return res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}