import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userID: {
        type: Number,
        required: true,
    },
    tokens: {
        refresh_token: {
            type: String,
            required: false,
        },
        refresh_token_expires_in: {
            type: Number,
            required: false,
        },

    },

});

const User = mongoose.model("user", userSchema);
export default User;
