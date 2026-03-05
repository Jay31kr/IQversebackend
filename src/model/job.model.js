import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
{
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    location: {
        type: String,
        trim: true
    },

    salary: {
        type: String,
        trim: true
    },

    experienceLevel: {
        type: String,
        enum: ["Internship", "Junior", "Mid", "Senior"]
    },

    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship", "Contract"]
    },

    skillsRequired: [
        {
            type: String,
            trim: true
        }
    ],

    applicants: [
        {
            type: Schema.Types.ObjectId,
            ref: "Candidate"
        }
    ],

    deadline: {
        type: Date
    }

},
{ timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);