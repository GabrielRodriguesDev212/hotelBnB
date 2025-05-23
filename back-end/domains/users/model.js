import { Schema, model } from "mongoose";

const userScheme = new Schema({

    name: String,
    email: { type: String, unique: true },
    password: String

})


export default model("User", userScheme)