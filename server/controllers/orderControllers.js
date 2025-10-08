import dotenv from "dotenv";
dotenv.config();

import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import { sendEmail } from "../config/email.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const currency = "inr";
const deliveryCharge = 50;


// ------------------- Place Order (COD) -------------------
export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ success: false, message: "Invalid items array" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Apply Plus Member discount if applicable
    let finalAmount = amount;
    if (user.plusMember && amount > 999) finalAmount = parseFloat((amount * 0.96).toFixed(2));

    finalAmount += deliveryCharge;

    // Save order
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount: finalAmount,
      paymentMethod: "COD",
      payment: false,
      status: "Pending",
      date: Date.now(),
    });
    await newOrder.save();

    // Remove items from cart
    if (user.cartData) {
      let cartData = { ...user.cartData };
      items.forEach(item => {
        if (cartData[item._id]) delete cartData[item._id];
      });
      await userModel.findByIdAndUpdate(userId, { cartData });
    }

    // Send email
    if (user.email) {
      const emailHtml = `
        <h1>Order Confirmation</h1>
        <p>Hi ${user.name || "Customer"},</p>
        <p>Thank you for your order! Your order ID is <strong>${newOrder.orderId}</strong>.</p>
        <p>Total Amount: ₹${finalAmount} ${user.plusMember && amount > 999 ? "(Includes 4% Plus Member Discount)" : ""}</p>
        <p>Payment Method: COD</p>
        <p>We will notify you once your order is shipped.</p>
      `;
      await sendEmail({
        to: user.email,
        subject: `Order ${newOrder.orderId} Placed Successfully!`,
        html: emailHtml,
      });
    }

    res.json({ success: true, message: "Order placed successfully", orderId: newOrder._id, amount: finalAmount });
  } catch (error) {
    console.error("placeOrder error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// export const placeOrderStripe = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { items, amount, address } = req.body;
//     const origin = req.headers.origin;

//     if (!amount || typeof amount !== "number" || amount <= 0)
//       return res.status(400).json({ success: false, message: "Invalid amount" });

//     const user = await userModel.findById(userId);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     // Apply Plus Member discount if applicable
//     let finalAmount = amount;
//     if (user.plusMember && amount > 999) finalAmount = parseFloat((amount * 0.96).toFixed(2));
//     finalAmount += deliveryCharge;

//     // Save order
//     const newOrder = new orderModel({
//       userId,
//       items,
//       address,
//       amount: finalAmount,
//       paymentMethod: "Stripe",
//       payment: false,
//       status: "Pending",
//       date: Date.now(),
//     });
//     await newOrder.save();

//     // Prepare Stripe line items
//     const line_items = items.map(item => ({
//       price_data: {
//         currency,
//         product_data: { name: item.name },
//         unit_amount: Math.round(item.amount * 100),
//       },
//       quantity: item.quantity,
//     }));

//     // Add delivery charges
//     if (deliveryCharge > 0) {
//       line_items.push({
//         price_data: {
//           currency,
//           product_data: { name: "Delivery Charges" },
//           unit_amount: Math.round(deliveryCharge * 100),
//         },
//         quantity: 1,
//       });
//     }

//     const session = await stripe.checkout.sessions.create({
//   success_url: `${origin}/verify?success=true&orderId=${newOrder.orderId}`,
//   cancel_url: `${origin}/verify?success=false&orderId=${newOrder.orderId}`,

//       line_items,
//       mode: "payment",
//     });

//     // Send email
//     if (user.email) {
//       const emailHtml = `
//         <h1>Order Initiated</h1>
//         <p>Hi ${user.name || "Customer"},</p>
//         <p>Your order ID <strong>${newOrder.orderId}</strong> has been created.</p>
//         <p>Total Amount: ₹${finalAmount} ${user.plusMember && amount > 999 ? "(Includes 4% Plus Member Discount)" : ""}</p>
//         <p>Please complete your payment to confirm the order.</p>
//       `;
//       await sendEmail({
//         to: user.email,
//         subject: `Order ${newOrder.orderId} Created - Payment Pending`,
//         html: emailHtml,
//       });
//     }

//     res.json({ success: true, session_url: session.url, orderId: newOrder._id, amount: finalAmount });
//   } catch (error) {
//     console.error("placeOrderStripe error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;
    const origin = req.headers.origin;

    if (!amount || typeof amount !== "number" || amount <= 0)
      return res.status(400).json({ success: false, message: "Invalid amount" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // ----------------- Calculate final amount including Plus Member discount -----------------
    let finalAmount = amount;
    if (user.plusMember && amount > 999) finalAmount = parseFloat((amount * 0.96).toFixed(2));
    finalAmount += deliveryCharge;

    // ----------------- Save order in DB -----------------
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount: finalAmount,
      paymentMethod: "Stripe",
      payment: false,
      status: "Pending",
      date: Date.now(),
    });
    await newOrder.save();

    // ----------------- Prepare Stripe line items -----------------
    const line_items = items.map(item => {
      let itemAmount = item.amount; // original price per unit

      // Apply 4% Plus Member discount directly to each item
      if (user.plusMember && amount > 999) {
        itemAmount = parseFloat((itemAmount * 0.96).toFixed(2)); // <--- Change here
      }

      return {
        price_data: {
          currency,
          product_data: { name: item.name },
          unit_amount: Math.round(itemAmount * 100), // must be non-negative integer
        },
        quantity: item.quantity,
      };
    });

    // Add delivery charges as a separate line item
    if (deliveryCharge > 0) {
      line_items.push({
        price_data: {
          currency,
          product_data: { name: "Delivery Charges" },
          unit_amount: Math.round(deliveryCharge * 100),
        },
        quantity: 1,
      });
    }

    // ----------------- Create Stripe checkout session -----------------
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder.orderId}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder.orderId}`,
      line_items,
      mode: "payment",
    });

    // ----------------- Send order email -----------------
    if (user.email) {
      const emailHtml = `
        <h1>Order Initiated</h1>
        <p>Hi ${user.name || "Customer"},</p>
        <p>Your order ID <strong>${newOrder.orderId}</strong> has been created.</p>
        <p>Total Amount: ₹${finalAmount} ${user.plusMember && amount > 999 ? "(Includes 4% Plus Member Discount)" : ""}</p>
        <p>Please complete your payment to confirm the order.</p>
      `;
      await sendEmail({
        to: user.email,
        subject: `Order ${newOrder.orderId} Created - Payment Pending`,
        html: emailHtml,
      });
    }

    res.json({ success: true, session_url: session.url, orderId: newOrder._id, amount: finalAmount });

  } catch (error) {
    console.error("placeOrderStripe error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const verifyStripe = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    const userId = req.userId;

    if (!orderId || !userId)
      return res.status(400).json({ success: false, message: "Order ID and User ID required" });

    // Payment success
    if (success === true || success === "true") {
      const order = await orderModel.findOneAndUpdate(
        { orderId },
        { payment: true, status: "Confirmed" },
        { new: true }
      );

      if (!order) return res.status(404).json({ success: false, message: "Order not found" });

      // Clear purchased items from user's cart
      const user = await userModel.findById(userId);
      if (user?.cartData) {
        let cartData = { ...user.cartData };
        order.items.forEach(item => {
          if (cartData[item._id]) delete cartData[item._id];
        });
        await userModel.findByIdAndUpdate(userId, { cartData });
      }

      // Send email confirmation
      if (user?.email) {
        try {
          const emailHtml = `
            <h1>Payment Successful</h1>
            <p>Hi ${user.name || "Customer"},</p>
            <p>Your payment for order <strong>${order.orderId}</strong> has been received successfully.</p>
            <p>Total Amount: ₹${order.amount}</p>
            <p>Thank you for shopping with us!</p>
          `;
          await sendEmail({
            to: user.email,
            subject: `Payment Received for Order ${order.orderId}!`,
            html: emailHtml,
          });
        } catch (err) {
          console.error("Email sending failed:", err);
        }
      }

      return res.json({ success: true, message: "Payment verified successfully." });
    } 
    // Payment failed
    else {
      await orderModel.findOneAndDelete({ orderId });
      return res.json({ success: false, message: "Order deleted due to payment failure." });
    }
  } catch (error) {
    console.error("verifyStripe error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// ------------------- Cancel Order -------------------
export const cancelOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.body;

    if (!orderId)
      return res.status(400).json({ success: false, message: "Order ID required" });

    const order = await orderModel.findOne({ orderId, userId });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    let refundMessage = "";
    if (order.payment && order.paymentMethod === "Stripe") {
      refundMessage = "Refund will be initiated to your account in 5–7 working days.";
    } else {
      refundMessage = "No refund applicable.";
    }

    // Refund via Stripe if paymentIntent exists
    if (order.payment && order.paymentMethod === "Stripe" && order.paymentIntentId) {
      try {
        await stripe.refunds.create({ payment_intent: order.paymentIntentId });
      } catch (err) {
        console.error("Refund error:", err);
        refundMessage = "Refund could not be initiated. Contact support.";
      }
    }

    await orderModel.findOneAndDelete({ orderId });

    const user = await userModel.findById(userId).select("email name");
    if (user?.email) {
      const emailHtml = `
        <h1>Order Cancelled</h1>
        <p>Hi ${user.name || "Customer"},</p>
        <p>Your order <strong>${order.orderId}</strong> has been cancelled.</p>
        <p>Total Amount: ₹${order.amount}</p>
        <p>${refundMessage}</p>
      `;
      await sendEmail({
        to: user.email,
        subject: `Order ${order.orderId} Cancelled`,
        html: emailHtml,
      });
    }

    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("cancelOrder error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------- User Orders -------------------
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    const enhancedOrders = await Promise.all(
      orders.map(async order => {
        const enhancedItems = await Promise.all(
          order.items.map(async item => {
            const product = await productModel.findById(item._id).select("amount image name");
            return {
              productId: item._id,
              amount: product?.amount || item.amount,
              image: product?.image || item.image,
              name: product?.name || item.name || "Unknown Product",
              quantity: item.quantity,
            };
          })
        );
        return {
          orderId: order.orderId,
          userId: order.userId,
          items: enhancedItems,
          amount: order.amount,
          address: order.address,
          status: order.status,
          paymentMethod: order.paymentMethod,
          payment: order.payment,
          date: order.date,
        };
      })
    );

    res.json({ success: true, message: "Orders fetched successfully", orders: enhancedOrders });
  } catch (error) {
    console.error("userOrders error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// ------------------- Admin: All Orders -------------------
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });

    const formattedOrders = orders.map(order => ({
      orderId: order.orderId,
      userId: order.userId,
      items: order.items,
      amount: order.amount,
      address: order.address,
      status: order.status,
      paymentMethod: order.paymentMethod,
      payment: order.payment,
      date: order.date,
    }));

    res.json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderModel.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Map special cases
    let updatedStatus = status;
    if (status === "Returned") updatedStatus = "Returned and Refunded";
    order.status = updatedStatus;
    await order.save();

    // Fetch user
    const user = await userModel.findById(order.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Define status-based email notifications
    const statusEmailMap = {
      "Returned and Refunded": {
        subject: `Refund Processed for Order ${order.orderId}`,
        html: `
          <h2>Hello ${user.name},</h2>
          <p>Your return for <b>Order #${order.orderId}</b> is completed.</p>
          <p>The refund of <b>${order.amount} INR</b> has been processed to your original payment method.</p>
          <br/>
          <p>Thanks for shopping with AnantaMart.</p>
        `
      },
      "Out for Delivery": {
        subject: `Your Order ${order.orderId} is Out for Delivery!`,
        html: `
          <h2>Hello ${user.name},</h2>
          <p>Your order <b>Order #${order.orderId}</b> is now out for delivery.</p>
          <p>It should reach you shortly. Track your order for updates.</p>
          <br/>
          <p>Thank you for shopping with AnantaMart!</p>
        `
      },
      "Delivered": {
        subject: `Your Order ${order.orderId} has been Delivered!`,
        html: `
          <h2>Hello ${user.name},</h2>
          <p>Your order <b>Order #${order.orderId}</b> has been successfully delivered.</p>
          <p>We hope you enjoy your purchase. Thank you for shopping with AnantaMart!</p>
        `
      }
      // Add more statuses and emails here if needed
    };

    // Send email if the updated status has an email configured
    if (statusEmailMap[updatedStatus]) {
      const emailData = statusEmailMap[updatedStatus];
      await sendEmail({
        to: user.email,
        subject: emailData.subject,
        html: emailData.html
      });
      console.log(`📧 Email sent for status "${updatedStatus}" to: ${user.email}`);
    }

    res.json({ success: true, message: `Order status updated to "${updatedStatus}"` });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Return order
// ------------------- Return Order -------------------
export const returnOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.body;

    if (!orderId)
      return res.status(400).json({ success: false, message: "Order ID required" });

    const order = await orderModel.findOne({ orderId, userId });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (order.status !== "Delivered")
      return res.status(400).json({ success: false, message: "Only delivered orders can be returned" });

    const deliveredDate = new Date(order.deliveredAt || order.date);
    const today = new Date();
    const diffDays = Math.floor((today - deliveredDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 7)
      return res.status(400).json({ success: false, message: "Return window expired (7 days)" });

    // Mark return in process
    order.status = "Return in Process";
    await order.save();

    res.json({ success: true, message: "Return request placed successfully" });
  } catch (error) {
    console.error("Return order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// approveReturn controller
export const approveReturn = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await orderModel.findOne({ orderId });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    // Update order status
    order.status = "Returned and Refunded";
    await order.save();

    // Fetch user
    const user = await userModel.findById(order.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Send refund email
    await sendEmail({
      to: user.email,
      subject: `Refund Processed for Order ${order.orderId}`,
      html: `
        <h2>Hello ${user.name},</h2>
        <p>Your return request for <b>Order #${order.orderId}</b> has been approved.</p>
        <p>The refund of <b>${order.amount} INR</b> has been processed to your original payment method.</p>
        <br/>
        <p>Thanks for shopping with AnantaMart.</p>
      `,
    });

    console.log("✅ Refund email sent to:", user.email);

    res.json({ success: true, message: "Return approved & refund email sent" });
  } catch (error) {
    console.error("Refund approval error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
