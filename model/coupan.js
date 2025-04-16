const mongoose = require('mongoose');

const coupansSchema = new mongoose.Schema({
  coupanName: { type: String, required: true },
  eligiablePrice: { type: Number, required: true },
  discount: { type: Number, required: true }
});

module.exports = mongoose.model('coupan', coupansSchema);
