const Attempt = require("../models/attemptschema.model");

const createAttempt = async (payload) => {
  const newAttempt = new Attempt(payload);

  return await newAttempt.save();
};

module.exports = {
  createAttempt,
};