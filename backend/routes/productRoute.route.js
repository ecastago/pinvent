const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
const router = express.Router();


router.post("/create", protect, upload.single("image"), createProduct); // upload.array for multiple imgaes
router.get("/", protect, getProducts);
router.get("/:id",protect, getProduct);
router.delete("/:id",protect, deleteProduct);
router.patch("/:id",protect,upload.single("image"), updateProduct);





module.exports = router;