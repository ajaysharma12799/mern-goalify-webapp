const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DBURI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1); // Exit the Process on Failure
  }
};

module.exports = connectDB;
