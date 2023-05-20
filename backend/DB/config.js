import mongoose from "mongoose";

const connectDB = async () => {
  
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      poolSize: 100,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
