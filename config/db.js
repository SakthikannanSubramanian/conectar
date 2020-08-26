const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Mongo connected");
  } catch (err) {
    console.log(`ERROR`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
