// import mongoose from 'mongoose'

// const orderSchema = new mongoose.Schema({
//     orderId: { type: String, required: true, unique: true },
//     userId: { type: String, required: true },
//     items: { type: Array, required: true },
//     amount: { type: Number, required: true },
//     address: { type: Object, required: true },
//     status: { type: String, required: true, default: 'Order Placed' }, // Order Placed, Packing, Shipped, Out for Delivery, Delivered, Return in Process, Returned
//     paymentMethod: { type: String, required: true },
//     payment: { type: Boolean, required: true, default: false },
//     date: { type: Number, required: true },
//     deliveredAt: { type: Number },
//     returnedAt: { type: Number },
// });

// // Auto-generate sequential orderId like "ORD1001"
// orderSchema.pre('validate', async function (next) {
//     if (this.isNew) {
//         const lastOrder = await mongoose.models.order.findOne({}, {}, { sort: { date: -1 } });
//         let lastNumber = 1000;
//         if (lastOrder && lastOrder.orderId) {
//             const match = lastOrder.orderId.match(/\d+$/);
//             if (match) lastNumber = parseInt(match[0], 10);
//         }
//         this.orderId = 'ORD' + (lastNumber + 1);
//     }
//     next();
// });

// const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
// export default orderModel;
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'Order Placed' }, // Order Placed, Packing, Shipped, Out for Delivery, Delivered, Return in Process, Returned
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true },
    deliveredAt: { type: Number },
    returnedAt: { type: Number },
});

// Auto-generate sequential orderId like "ORD1001"
orderSchema.pre('validate', async function (next) {
    if (this.isNew) {
        const lastOrder = await mongoose.models.order.findOne({}, {}, { sort: { date: -1 } });
        let lastNumber = 1000;
        if (lastOrder && lastOrder.orderId) {
            const match = lastOrder.orderId.match(/\d+$/);
            if (match) lastNumber = parseInt(match[0], 10);
        }
        this.orderId = 'ORD' + (lastNumber + 1);
    }
    next();
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
