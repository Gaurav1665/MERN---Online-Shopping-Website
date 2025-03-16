import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import WishlistSchema from '../../Schemas/WishlistSchema.js';
import jwt from 'jsonwebtoken';

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

// 1. Get All Wishlists
router.get("/get", authenticateToken, async (req, res) => {
    console.log(req.user.userId)
    const userId = req.user.userId;
    const wishlists = await WishlistSchema.find({ UserId: userId });
    res.json(wishlists);
});

// 3. Insert a New Wishlist
router.post("/add", authenticateToken, async (req, res) => {
    const UserId = req.user.userId;
    const { ProductID } = req.body;

    const newWishlist = new WishlistSchema({
        ProductID,
        UserId
    });

    await newWishlist.save();
    res.send({ message: "Wishlist created successfully", wishlist: newWishlist });
});

// 4. Update Wishlist by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { ProductID, UserId } = req.body;
    const wishlist = await WishlistSchema.findById(id);

    if (!wishlist) {
        return res.send("Wishlist not found");
    }

    wishlist.ProductID = ProductID;
    wishlist.UserId = UserId;

    await wishlist.save();
    res.send({ message: "Wishlist updated successfully", wishlist });
});

// 5. Delete Wishlist by ID
router.delete("/delete/:id", authenticateToken, async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.userId;

    const wishlistItem = await WishlistSchema.findOne({ ProductID: productId, UserId: userId });

    if (!wishlistItem) {
        return res.status(404).json({ message: "Item not found in wishlist" });
    }

    await WishlistSchema.deleteOne({ ProductID: productId, UserId: userId });

    res.json({ message: "Item removed from wishlist" });
});

export default router;