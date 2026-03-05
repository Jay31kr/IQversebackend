import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const companySchema = new Schema({
    userName : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

     email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    about : {
        type: String,
        trim: true,
        
    },
    profilePhoto: {
        type: String
    },

    jobPosted: [
        {
            type: Schema.Types.ObjectId,
            ref: "Job"
        }
    ],


},{timestamps:true})

export const Company = mongoose.model("Company", companySchema);