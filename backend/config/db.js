const mongoose = require("mongoose");
connectdb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(connection.connection.host);
  } catch (e) {
    console.log(e);
  }
};
module.exports = connectdb;
