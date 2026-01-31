import express from "express";
import cors from "cors";

import customerRoutes from "./routes/customer.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Customer Order API is running");
});


app.use(cors());


app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

export default app;
    