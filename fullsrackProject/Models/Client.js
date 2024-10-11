const mongooes = require("mongoose");

const clientSchema = new mongooes.Schema({
  phone: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpiration: { type: Date },
});

module.exports = mongooes.model("Client", clientSchema);
