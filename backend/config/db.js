import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Try to connect to the database using the provided connection string and options
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // If the connection is successful, log a message to the console indicating the connection host
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // If there is an error connecting to the database, log an error message and exit the process with an error code
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;



