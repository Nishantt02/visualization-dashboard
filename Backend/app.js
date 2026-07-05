import express from "express";
import cors from "cors";

import dataRoutes from "./routes/dataRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", dataRoutes);

export default app;