const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
         name: String,

          email: {
            type: String,
            required: true,
            unique: true,
          },
          password: {
            type: String,
            required: true,
          },
           role: {
            type: String,
            enum: ["ROLE_ADMIN", "ROLE_USER"],
            default: "ROLE_USER",
          },

});
const User = new mongoose.model("User", UserSchema);
module.exports = User;