const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connnect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected: ${connnect.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    throw new Error(error);
  }
};

module.exports = connectDB;
