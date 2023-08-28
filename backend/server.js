const express = require("express");
const connectdb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();
const cors = require("cors");
require("dotenv").config();
connectdb();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.get("/", (_, res) => res.json({ message: "hello from home page" }));
app.listen(PORT, () => console.log(`listening at port ${PORT}`));
