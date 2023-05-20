import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  transact,
  getTransactions,
  getWallet
} from "../controllers/home.controller.js";

const homeRouter = express.Router();

homeRouter.route("/transact/:walletId").post( protect, transact)
homeRouter.route("/transactions").get(protect, getTransactions)
homeRouter.route("/wallet/:id").get(protect, getWallet)

export default homeRouter;
