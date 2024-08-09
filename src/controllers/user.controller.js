import {asyncHandler} from "../utils/asyncHandler.js"
// to handle errors while getting user data
import {ApiError} from "../utils/ApiError.js"
// to validate if the user already exist
import {User} from "../models/user.model.js"
// to upload in cloudinary 
import {uploadOnCloudinary} from "../utils/cloudinary.js";
// to send success message if everything went right
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res) => {
    // get user details from frontend
    // validation (correct formats, empty values)
    // check if user already exist: (using username or email)
    // check for images, check for avatar
    // upload them to cloudinary 
    // create user object - create entry in db
    // remove password and refresh token field from response 
    // check for user creation
    // return res

    // get user detail from frontend
    const {fullName, email, username, password} = req.body //This piece of code is an example of object destructuring in JavaScript. It allows you to extract specific properties from an object and assign them to variables in a concise manner.
    console.log("Email: ", email);

    // if block syntax
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // Checking if the user already exist in database
    const existedUser = User.findOne({ // findOne returns the first document that it finds
        $or: [{username}, {email}] // or operator checks for all the values such as username and email
    })

    if (existedUser){
        throw new ApiError(409, "User with email or username already exist");
    }

    // checking for avatar and images
    const avatarLocalPath = req.files?.avatar[0]?.path; // ? means if exists
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // uploading in cloudinary 
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    // Doing an entry in database
    const user = await User.create({
        fullName,
        avatar: avatar.url, // cloudinary returns an url after uploading avatar to the database
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select( // select selects all the fields found using user id
        "-password -refreshToken" // - sign is used to unselect the items you don't want
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully") // created an object called ApiResponse passed values
    )
})

export {registerUser}