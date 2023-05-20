import mongoose from "mongoose";

const transactionsSchema = mongoose.Schema(
  {
    walletId: {
        type: String,
        required: true,
        maxLength: 100,
    },
    description: {
        type: String,
        required: true,
        maxLength: 100,
    },
    amount: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    type: {
      type: String,
      required: true,
      maxLength: 10,
    },
    from: {
      type: String,
      maxLength: 100,
    }
  },
  {
    timestamps: true,
  }
);

const Transactions = mongoose.model("transactions", transactionsSchema);

export { Transactions };
