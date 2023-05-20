// General dependancies
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Other imports here
import connectDB from "./DB/config.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// Importing routes
import authorizeUser from "./routes/auth.router.js";
import homeRouter from "./routes/home.router.js";

// Server and environment config
const app = express();
dotenv.config();
connectDB();

// For cross origin access (react)
app.use(
  cors({
    origin: "*",
  })
);

app.use(helmet());
app.use(express.json()); // alternative to body parser
app.use(morgan("dev"));

app.use("/auth", authorizeUser);
app.use(homeRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is listening on port "${PORT}"`));
