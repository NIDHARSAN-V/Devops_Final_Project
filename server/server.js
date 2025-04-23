import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();
const port = process.env.PORT || 5000;

await connectDB();
await connectCloudinary();

// Allow multiple origins
const allowedOrigins = [
  process.env.FRONTEND_URL,              // From ConfigMap
  "http://mern-frontend-service",        // Kubernetes internal
  "http://mern-frontend-service:8088",     // Service port
  "http://localhost:30005",              // NodePort access
  "http://localhost:5173"                // Local dev
];

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// Middleware configuration
app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
  if (req.path.startsWith('/back')) {
    req.url = req.url.replace('/back', '/api'); // Rewrite path
  }
  next();
});



app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("API is Working"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
