import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import ProductSchema from '../../Schemas/ProductSchema';

require('dotenv').config();

mongoose.connect(process.env.DBURL).then(() => {
    console.log("Database Connected");

    const router = express.Router();
    router.use(bodyParser.json());

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../../Images/ProductImage'));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage: storage });

    // Add Product API (POST)
    router.post("/", upload.single('ProductImage'), async (req, res) => {
        const { ProductID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID } = req.body;
        const ProductImage = req.file ? req.file.filename : null;

        const newProduct = new ProductSchema({
            ProductID,
            ProductImage,
            ProductName,
            ProductDescription,
            ProductPrice,
            ProductQuantity,
            ProductDiscount,
            CategoryID
        });

        await newProduct.save();
        res.send("Product created successfully");
    });

    // Update Product API (PUT)
    router.put("/:id", upload.single('ProductImage'), async (req, res) => {
        const { ProductID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID } = req.body;
        const ProductImage = req.file ? req.file.filename : null;

        const updatedProduct = await ProductSchema.findByIdAndUpdate(
            req.params.id,
            {
                ProductID,
                ProductName,
                ProductDescription,
                ProductPrice,
                ProductQuantity,
                ProductDiscount,
                CategoryID,
                ProductImage: ProductImage || undefined
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.send("Product not found");
        }

        res.send("Product updated successfully");
    });

    // Get Product By ID (GET)
    router.get("/:id", async (req, res) => {
        const product = await ProductSchema.findById(req.params.id);
        if (!product) {
            return res.send("Product not found");
        }
        res.send(product);
    });

    // Get All Products (GET)
    router.get("/", async (req, res) => {
        const products = await ProductSchema.find();
        res.send(products);
    });

    // Delete Product By ID (DELETE)
    router.delete("/:id", async (req, res) => {
        const deletedProduct = await ProductSchema.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.send("Product not found");
        }
        res.send("Product deleted successfully");
    });

});
