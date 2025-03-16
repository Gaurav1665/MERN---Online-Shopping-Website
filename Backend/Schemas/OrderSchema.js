import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    ProductItems: [{
        ProductID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        },
        ProductQuantity: Number
    }],
    TotalAmount: Number,
    OrderDate: Date,
    status: {   // Added field
        type: String,
        enum: ['Pending', 'Delivered'],
        default: 'Pending'  // Default status is Pending
    }
});

export default mongoose.model('orders', orderSchema);
