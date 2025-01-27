import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import CartSchema from '../../Schemas/CartSchema';

require('dotenv').config();

mongoose.connect(process.env.DBURL).then(() => {
    console.log("Database Connected");

    const router = express.Router();
    router.use(bodyParser.json());

    // Get User Cart (by UserID)
    router.get("/cart/:id", async (req, res) => {
        const data = await CartSchema.find({ UserID: req.params.id });
        res.send(data);
    });

    // Empty Cart (by UserID)
    router.delete("/cart/:id", async (req, res) => {
        await CartSchema.deleteMany({ UserID: req.params.id });
        res.send("Cart emptied successfully");
    });

    // Add Item to Cart
    router.post("/cart/:userId", async (req, res) => {
        const { ProductID, ProductQuantity } = req.body;
        const { userId } = req.params;

        const existingItem = await CartSchema.findOne({ UserID: userId, ProductID });

        if (existingItem) {
            existingItem.ProductQuantity += ProductQuantity;
            await existingItem.save();
            return res.status(200).json({ message: "Product quantity updated", item: existingItem });
        }

        const newCartItem = new CartSchema({
            ProductID,
            ProductQuantity,
            UserID: userId
        });

        await newCartItem.save();
        res.send("Product added to cart");
    });

    // Remove Item from Cart (by CartID)
    router.delete("/cart/item/:cartId", async (req, res) => {
        const deletedItem = await CartSchema.findByIdAndDelete(req.params.cartId);

        if (!deletedItem) {
            return res.send("Cart item not found");
        }

        res.send("Cart item removed");
    });

});
