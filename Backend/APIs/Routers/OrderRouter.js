import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import OrderSchema from '../../Schemas/OrderSchema.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
router.use(bodyParser.json());

// Middleware to authenticate the token and extract userId
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, 'private', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = decoded; // Store decoded user info (including userId) in the request object
        next(); // Proceed to the next middleware or route handler
    });
};

// 1. Get Orders for a Specific User by UserID (from the decoded token)
router.get("/", authenticateToken, async (req, res) => {
    const { status } = req.query; // Get status from query params
    const userId = req.user.userId; // Extract userId from the decoded token

    try {
        // Build query to fetch orders for the given userId and optional status filter
        const query = { UserID: userId };
        if (status) {
            query.status = status; // Filter by status if provided
        }

        const orders = await OrderSchema.find(query)
            .populate('ProductItems.ProductID'); // Populate product details for each order

        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 2. Get Order by ID
router.get("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const order = await OrderSchema.findById(id).populate('ProductItems.ProductID');
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 3. Create New Order
router.post("/", authenticateToken, async (req, res) => {
    const { ProductItems, TotalAmount, OrderDate, status } = req.body;
    const userId = req.user.userId; // Extract userId from the decoded token

    try {
        const newOrder = new OrderSchema({
            UserID: userId, // Use the userId from the decoded token
            ProductItems,
            TotalAmount,
            OrderDate,
            status: status || "Pending", // Default to "Pending" if no status is provided
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 4. Update Order Status (e.g., when an order is delivered)
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Expecting a new status value

    if (!status || !['Pending', 'Delivered'].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    try {
        const updatedOrder = await OrderSchema.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } // Return the updated order
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order status updated successfully", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 5. Delete Order by ID
router.delete("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await OrderSchema.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;