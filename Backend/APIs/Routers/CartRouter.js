import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import CartSchema from '../../Schemas/CartSchema.js';
import jwt from 'jsonwebtoken'

const router = express.Router();
router.use(bodyParser.json());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, 'private', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
};

router.post("/add", authenticateToken, async (req, res) => {
    const { ProductID, ProductQuantity } = req.body;
    const userId = req.user.userId;

    // Check if the product is already in the user's cart
    const existingItem = await CartSchema.findOne({ ProductID, UserID: userId });

    if (existingItem) {
        // If item exists, update the quantity instead of adding a duplicate
        existingItem.ProductQuantity += ProductQuantity; // Increment the quantity
        await existingItem.save();
        return res.json({ message: "Product quantity updated in cart" });
    }

    // If item doesn't exist, add it to the cart
    const newCartItem = new CartSchema({ ProductID, ProductQuantity, UserID: userId });
    await newCartItem.save();
    res.json({ message: "Item added to cart" });
});

// Get user's cart
router.get("/get", authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const cartItems = await CartSchema.find({ UserID: userId });
    res.json(cartItems);
});

router.put("/update", authenticateToken, async (req, res) => {
    const { ProductID, ProductQuantity } = req.body;
    const userId = req.user.userId;

    if (!ProductID || !ProductQuantity || ProductQuantity < 1) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const cartItem = await CartSchema.findOne({ ProductID, UserID: userId });

    if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.ProductQuantity = ProductQuantity;
    await cartItem.save();

    res.json({ message: "Cart item updated successfully" });
});

// Remove cart item
router.delete("/delete/:id", authenticateToken, async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.userId;

    const cartItem = await CartSchema.findOne({ ProductID: productId, UserID: userId });
    if (!cartItem) {
        return res.status(404).json({ message: "Item not found in cart" });
    }
    await CartSchema.deleteOne({ ProductID: productId, UserID: userId });
    
    res.json({ message: "Item removed from cart" });
});


export {router};