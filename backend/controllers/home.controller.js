import { Transactions } from "../models/transactions.model.js";
import { User } from "../models/users.model.js";
import asyncHandler from "express-async-handler";

const transact = asyncHandler(async (req, res) => {
  const walletId = req.params.walletId
  const { description, type } = req.body
  let amount = +req.body.amount
  amount = type === "CREDIT" ? amount : -amount
  
  const status = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $inc: { currentBalance: -amount } }
  )

  const updateBalance = await User.findOneAndUpdate(
    { walletId },
    { $inc: { currentBalance: amount } }
  )
  
  const transaction = new Transactions({
    walletId,
    description,
    amount,
    balance: status._doc.currentBalance + amount,
    type,
    from: req.user.walletId
  });
  await transaction.save();

  if (transaction) {
    res.status(200).json({
      message: "Success",
    });
  } else {
    res.status(400).json({
      message: "There has been an error",
    });
  }
})

const getTransactions = asyncHandler(async (req, res) => {
  const { walletId, skip, limit } = req.query
  const [sortOn, sortType] = [req.query.sort, req.query.sortType]

  const transactions = await Transactions.find(
    { from: walletId }
  )
  .skip(+skip)
  .limit(+limit)
  .sort({ ...( sortOn && {[sortOn]: sortType === "inc" ? 1 : -1} ) })

  if(transactions){
    res.status(200).json({
      transactions
    });
  } else {
    res.status(400);
    throw new Error("Cannot get transactions");
  }
})

const getWallet = asyncHandler(async (req, res) => {
  const walletId = req.params.id

  const response = await User.findOne(
    { walletId }
  ).select("-password")
  
  if (response){
    res.status(200).json({
      ...response._doc
    })
  } else {
    res.status(500)
    throw new Error("Cannot fetch wallet")
  }
})

export { transact, getTransactions, getWallet };
