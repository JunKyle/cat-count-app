const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  	pseudo: String,
  	email: String,
  	createdAt: Date,
	password: String 
});

module.exports User = userSchema