const Category = require('../models/Category')
const Course = require('../models/Plan')

// create category 
exports.createCategory = async (req, res) => {
    try {
        // fetch data 
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                messege: "All fields are required"
            });
        }

        // create entry in db 
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        })

        return res.status(200).json({
            success: true,
            messege: "Category created successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            messege: error.messege
        });
    }
}


exports.showAllCategories = async (req, res) => {
    try {
        // fetch from db 
        const allCategories = await Category.find({}, { name: true }, { description: true })
        return res.status(200).json({
            success: true,
            data: allCategories,
            messege: "Category fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            messege: error.messege
        });
    }
}