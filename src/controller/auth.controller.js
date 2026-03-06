import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Candidate } from "../model/candidate.model";
import mongoose from "mongoose";

const registerCandidate = asyncHandler( async (req , res)=>{
    
    const {userName , email , password} = req.body;
    if([userName ,  email , password].some((field)=> !field || field?.trim()==="")){
        throw new ApiError(400 , "All FIelds are required!!");
    }

    const existedUser = await Candidate.findOne({$or :  [{ userName }, { email }]});

    if(existedUser) throw new ApiError(409 , "user with the same username or email already exist");

    const user = await Candidate.create({
        userName,
        email, 
        password
    })

    const createdUser = await Candidate.findById(user._id).select("-password");

    if(!createdUser) throw new ApiError(500 , "something went wrong while registering user!!");

 if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )

})

const registerCompany = asyncHandler( async (req , res)=>{
    
    const {userName , email , password} = req.body;
    if([userName ,  email , password].some((field)=> !field || field?.trim()==="")){
        throw new ApiError(400 , "All FIelds are required!!");
    }

    const existedUser = await Company.findOne({$or :  [{ userName }, { email }]});

    if(existedUser) throw new ApiError(409 , "user with the same username or email already exist");

    const user = await Company.create({
        userName,
        email, 
        password
    })

    const createdUser = await Company.findById(user._id).select("-password");

    if(!createdUser) throw new ApiError(500 , "something went wrong while registering user!!");

 if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )

})

const loginCandidate = asyncHandler(async (req , res)=>{

    const {userName , email , password}=req.body;

    if(((!userName && !email) || !password) || [userName , email , password].some((field)=>field?.trim()==="")){
        throw new ApiError(400 , "All Fields are required!!");
    }

    const user = await Candidate.findOne({$or : [{userName} , {email}]})
    if(!user) throw new ApiError(404 , "User does not exist");

    const isPasswordValid = user.isPasswordValid(password);
    if(!isPasswordValid) throw new ApiError(401 , "Invalid user credentials");

    const accessToken = user.generateAccessToken();

    const loggedInUser = await Candidate.findById(user._id).select("-password");
      
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser,
            },
            "User logged In Successfully"
        )
    )

})


const loginCompany = asyncHandler(async (req , res)=>{

    const {userName , email , password}=req.body;

    if(((!userName && !email) || !password) || [userName , email , password].some((field)=>field?.trim()==="")){
        throw new ApiError(400 , "All Fields are required!!");
    }

    const user = await Company.findOne({$or : [{userName} , {email}]})
    if(!user) throw new ApiError(404 , "User does not exist");

    const isPasswordValid = user.isPasswordValid(password);
    if(!isPasswordValid) throw new ApiError(401 , "Invalid user credentials");

    const accessToken = user.generateAccessToken();

    const loggedInUser = await Company.findById(user._id).select("-password");
      
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser,
            },
            "User logged In Successfully"
        )
    )

})

const logoutCandidate = asyncHandler(async (req, res) => {

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        )

})

const logOutCompany = asyncHandler(async (req , res)=>{
    const options = {
        httpOnly:true,
        secure:true
    }

    return res
           .status(200)
           .clearCookie("accessToken", options)
           .json(
             new ApiResponse(
                200,
                {},
                "User logged out successfully"
             )
           )

})

export {registerCandidate , registerCompany,loginCandidate ,loginCompany,logoutCandidate, logOutCompany};