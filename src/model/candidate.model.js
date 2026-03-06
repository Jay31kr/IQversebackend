import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String // URL of project image
    },
    projectLink: {
        type: String
    }
});

const linkSchema = new Schema({
    platform: {
        type: String, // github, linkedin, twitter etc
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const candidateSchema = new Schema(
{
    username: {
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

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    profilePhoto: {
        type: String
    },

    resume: {
        type: String
    },
    
    about: {
        type: String,
        trim: true
    },

    skills: [
        {
            type: String
        }
    ],

    projects: [projectSchema],

    links: [linkSchema],

    applications: [
        {
            type: Schema.Types.ObjectId,
            ref: "Job"
        }
    ],

    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Job"
        }
    ]
},
{ timestamps: true }
);

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const Candidate = mongoose.model("Candidate", candidateSchema);