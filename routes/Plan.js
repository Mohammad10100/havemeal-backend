// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers
const { createPlan,  editPlan, getAllPlans, getPlanDetails, getAdminPlans, deletePlan } = require("../controller/Plan");
const { showAllCategories, createCategory, } = require("../controller/Category");
// const { createRating, getAvgRating, getAllRatingReview, getReviewsByPlan } = require("../controller/RatingAndReview")
const { auth, isDeliveryGuy, isAdmin } = require("../middleware/auth")


// Plans can Only be Created by Sellers
router.post("/createPlan", auth, isAdmin, createPlan)
router.post("/editPlan", auth, isAdmin, editPlan)
router.delete("/deletePlan", auth, isAdmin, deletePlan)
router.get("/showAllPlans", getAllPlans)
router.post("/getPlanDetails", getPlanDetails)
router.get("/getAdminPlans", auth, isAdmin, getAdminPlans)
// TODO: get plans according to provider/seller/shop
// router.get("/getPlansByProvider", auth, isAdmin, getPlansByProvider)


// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)


// router.post("/createRating", auth, isBuyer, createRating)
// router.get("/getAverageRating", getAvgRating)
// router.get("/getReviews", getAllRatingReview)
// router.get("/getReviewsByPlan", getReviewsByPlan)

module.exports = router