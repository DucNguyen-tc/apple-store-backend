const express = require("express");
const cors = require("cors"); // Thêm dòng này
require("dotenv").config(); // Load environment variables
const productCategoryRoute = require("./routes/productCategory.route");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const promotionRoute = require("./routes/promotion.route"); // Import promotion routes
const productPromotionRoute = require("./routes/productPromotion.route"); // Import product promotion routes
const productVariantRoute = require("./routes/productVariant.route"); // Import product variant routes
const cartItemRoute = require("./routes/cartItem.route"); // Import cart item routes
const productVariantImageRoute = require("./routes/productVariantImage.route"); // Import product variant image routes
const orderRoute = require("./routes/order.route"); // Import order routes
const orderItemRoute = require("./routes/orderItem.route"); // Import order item routes
const errorHandler = require("./middleware/errorHandler"); // Import error handler middleware

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

// Thêm cấu hình CORS cho phép frontend truy cập
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware xử lý dữ liệu
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// Routes
app.get("/", (req, res) => {
  res.send("Hello, ExpressJS!");
});
app.use("/api/product-categories", productCategoryRoute); // Product category routes
app.use("/api/products", productRoute); // Product routes
app.use("/api/auth", authRoute); // Authentication routes
app.use("/api/users", userRoute); // User routes
app.use("/api/promotions", promotionRoute); // Promotion routes
app.use("/api/product-promotions", productPromotionRoute); // Product promotion routes
app.use("/api/product-variants", productVariantRoute); // Product variant routes
app.use("/api/cart-items", cartItemRoute); // Cart item routes
app.use("/api/product-variant-images", productVariantImageRoute); // Product variant image routes
app.use("/api/orders", orderRoute); // Order routes
app.use("/api/order-items", orderItemRoute); // Order item routes

// Error handling middleware
app.use(errorHandler); // Handle errors

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
