const bcrypt = require("bcrypt");

async function hashPassword(pass) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
}

module.exports = hashPassword;