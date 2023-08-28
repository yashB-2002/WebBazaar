const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
  try {
    const pswd = await bcrypt.hash(password, 10);
    return pswd;
  } catch (error) {
    console.log("password not hashed");
  }
};
const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
module.exports = { hashPassword, comparePassword };
