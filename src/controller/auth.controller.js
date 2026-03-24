import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Candidate } from "../model/candidate.model.js";
import {Company} from "../model/company.model.js";
import { signAccessToken } from "../utils/jwt.js";
import mongoose from "mongoose";

export const registerCandidate = asyncHandler( async (req , res)=>{
    
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

 

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )

})

export const registerCompany = asyncHandler( async (req , res)=>{
    
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

export const loginCandidate = asyncHandler(async (req , res)=>{

    const {userName , email , password}=req.body;

    if(((!userName && !email) || !password) || [userName , email , password].some((field)=>field?.trim()==="")){
        throw new ApiError(400 , "All Fields are required!!");
    }

    const user = await Candidate.findOne({$or : [{userName} , {email}]})
    if(!user) throw new ApiError(404 , "User does not exist");

    const isPasswordValid = await user.isPasswordValid(password);
    if(!isPasswordValid) throw new ApiError(401 , "Invalid user credentials");


    const loggedInUser = await Candidate.findById(user._id).select("-password");
    const accessToken = signAccessToken({userId:loggedInUser._id.toString()})  

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


export const loginCompany = asyncHandler(async (req , res)=>{

    const {userName , email , password}=req.body;

    if(((!userName && !email) || !password) || [userName , email , password].some((field)=>field?.trim()==="")){
        throw new ApiError(400 , "All Fields are required!!");
    }

    const user = await Company.findOne({$or : [{userName} , {email}]})
    if(!user) throw new ApiError(404 , "User does not exist");

    const isPasswordValid = await user.isPasswordValid(password);
    if(!isPasswordValid) throw new ApiError(401 , "Invalid user credentials");

    
    const loggedInUser = await Company.findById(user._id).select("-password");
    const accessToken = signAccessToken({userID:loggedInUser._id.toString()});
      
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

export const logoutCandidate = asyncHandler(async (req, res) => {

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

export const logOutCompany = asyncHandler(async (req , res)=>{
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

export const getCandidate = asyncHandler(async (req, res) => {
  const user = await Candidate.findById(req.user.id).select("-password");
  res.json({ success: true, data: { user } });
});

export const getCompany = asyncHandler(async (req, res) => {
  const user = await Company.findById(req.user.id).select("-password");
  res.json({ success: true, data: { user } });
});