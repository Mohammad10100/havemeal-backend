// Import the required modules
const express = require("express")
const router = express.Router()

// importing controllers
const { login, signup, sendotp, sendotpsms, changePassword } = require("../controller/Auth")
const { resetPasswordToken, resetPassword } = require("../controller/ResetPassword")

//importing middlewares
const { auth } = require("../middleware/auth")


// Routes for Login, Signup, and Authentication
router.post("/login", login)
router.post("/signup", signup)
router.post("/sendotp", sendotp)
router.post("/changepassword", auth, changePassword)


// Route for reseting password
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router