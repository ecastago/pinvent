const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const userModel = require("../models/userModel");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async(req,res)=>{
    const {name, sku, category, quantity, price, description} = req.body;

    // Validation
    if(!name || !sku || !category || !quantity || !price || !description){
        res.status(400)
        throw new Error("Please fill all the fields");
    }

    // Manage Image Upload
    let fileData = {}
    if(req.file){
        // Save image to cloudinary
        let uploadedFile;

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "merntutorial", resource_type: "image"})
        } catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded");
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        }
    }

    // Create Product
    const product = await Product.create({
        user: req.user._id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData
    });

    res.status(200).json(product);

})

// Get all Products
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({user: req.user._id}).sort("-createdAt");

    res.status(200).json(products);
})

// Get single Product
const getProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(404);
        throw new Error("Product not Found");
    }
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User Not authorized");
    }

    res.status(200).json(product);
})

// Delete Product
const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    // if product dont exists
    if(!product){
        res.status(404);
        throw new Error("Product not Found");
    }
    // Match product to user
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User Not authorized");
    }

    await product.deleteOne();
    res.status(200).json(product);
})

// Update Product
const updateProduct = asyncHandler(async(req,res)=>{
    const {name, category, quantity, price, description} = req.body;

    const product = await Product.findById(req.params.id);

    // if product dont exists
    if(!product){
        res.status(404);
        throw new Error("Product not Found");
    }

    // Match product to user
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User Not authorized");
    }
    // Manage Image Upload
    let fileData = {}
    if(req.file){
        // Save image to cloudinary
        let uploadedFile;

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "merntutorial", resource_type: "image"})
        } catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded");
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        }
    }

    // Update Product
    
    const updatedProduct = await Product.findByIdAndUpdate(
        {_id: req.params.id},
        {
            name,
            category,
            quantity,
            price,
            description,
            image: Object.keys(fileData) == 0 ? product?.image : fileData
        },
        {
            new: true,
            runValidators: true
        }
    ) 


    res.status(200).json(updatedProduct);

})

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}