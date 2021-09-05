const bcrypt = require("bcrypt");

module.exports = async function (pass) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};
