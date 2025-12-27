import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken"
import { Op } from 'sequelize';
import path from "path";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findByPk(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken
        await user.save()
        
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload images to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {fullName, email, username, password, role} = req.body
    console.log('Registration request received:', { fullName, email, username, role: role || 'not provided' })

    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    )
    {
        throw new ApiError(400, "something is Empty")
    }

    const existedUser = await User.findOne({
        where: {
            [Op.or]: [{ email }, { username }]
        }
    })

    if(existedUser)
        throw new ApiError(409, "User with username or email already exists");
    const avatarLocalPath = req.file?.path;
    console.log('Avatar file path:', avatarLocalPath);

    let avatarUrl;
    if (avatarLocalPath) {
        console.log('Uploading avatar to Cloudinary...');
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        console.log('Avatar upload result:', avatar ? 'Success' : 'Failed');

        avatarUrl = avatar?.url
            ? avatar.url
            : `/temp/${path.basename(avatarLocalPath)}`;
    }

    // Validate role if provided
    const userRole = role && ['USER', 'TECHNICIAN'].includes(role.toUpperCase()) 
        ? role.toUpperCase() 
        : 'USER';

    try {
        const user = await User.create({
            fullName,
            name: fullName, // Also set name field for backward compatibility
            avatar: avatarUrl,
            email,
            password,
            username:username.toLowerCase(),
            role: userRole
        })

        console.log('User created successfully with ID:', user.id);

        const createdUser = await User.findByPk(user.id, {
            attributes: { exclude: ['password', 'refreshToken'] }
        })

        if(!createdUser)
        {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return res.status(201).json(new ApiResponse(201, createdUser, "user registered successfully"))
    } catch (error) {
        console.error('Error creating user:', error);
        // If it's a Sequelize validation error, provide more details
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message).join(', ');
            throw new ApiError(400, `Validation error: ${messages}`);
        }
        // If it's a unique constraint error
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new ApiError(409, "User with this email or username already exists");
        }
        // Re-throw the error if it's already an ApiError
        if (error instanceof ApiError) {
            throw error;
        }
        // Otherwise, throw a generic error
        throw new ApiError(500, `Error creating user: ${error.message}`);
    }
} )

const loginUser = asyncHandler( async (req, res) => {
    // take username take password using req body
    // check if field is empty
    // find the user
    // validate password
    // access and refresh token
    // send cookies
    // console.log(req)
    const {email, username, password} = req.body;

    if(!(email || username))
    {
        throw new ApiError(400, "username or password is required")
    }

    const orConditions = [];
    if (email) orConditions.push({ email });
    if (username) orConditions.push({ username });

    if (orConditions.length === 0) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        where: {
            [Op.or]: orConditions
        }
    })

    if(!user){
        throw new ApiError(404, "User does not exists")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid)
    {
        throw new ApiError(401, "Password is not valid")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user.id);

    const loggedInUser = await User.findByPk(user.id, {
        attributes: { exclude: ['password', 'refreshToken'] }
    })
  
    const isProduction = process.env.NODE_ENV === "production";
    const options = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User LoggedIn successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    // clear cookies of the user
    // clear access and refresh token from database

    const user = await User.findByPk(req.user.id);
    user.refreshToken = null;
    await user.save();

    const isProduction = process.env.NODE_ENV === "production";
    const options = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged out"))

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findByPk(decodedToken?.id);
        
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401 ,"Refresh token is expired or used")
        }
    
        const isProduction = process.env.NODE_ENV === "production";
        const options = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        }
    
        const {accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user.id)
    
        res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(
            200, 
            {accessToken, refreshToken:newRefreshToken},
            "access token refreshed"
        ))
    } catch (error) {
        throw new ApiError(401, error?.msg || "Invalid refresh token")
    }
})

const changeCurrentUserPassword = asyncHandler( async(req, res) => {
    // take old password and new password
    // validate old password
    // if it is valid change it to new password
    // else throw error

    const {oldPassword, newPassword} = req.body;

    const user = await User.findByPk(req.user.id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect)
    {
        throw new ApiError(400, "Invalid Old Password")
    }

    user.password = newPassword
    await user.save()

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    // 1. Validation
    if (!fullName && !email) {
        throw new ApiError(400, "fullName or email is required to update");
    }

    // 2. Find the user
    const user = await User.findByPk(req.user.id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 3. Update fields
    if (fullName) {
        user.fullName = fullName;
        user.name = fullName; // Also update name field for backward compatibility
    }
    if (email) user.email = email;

    // 4. Save to Database
    await user.save();

    // 5. Prepare response (No need for a second DB query)
    // Sequelize instances can be converted to plain objects
    const updatedUser = user.toJSON();
    delete updatedUser.password;
    delete updatedUser.refreshToken;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                updatedUser, 
                "Account details updated successfully"
            )
        );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if(!avatarLocalPath)
    {
        throw new ApiError(400, "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if(!avatar.url)
    {
        throw new ApiError(500, "Error while uploading avatar")
    }

    const user = await User.findByPk(req.user.id);
    user.avatar = avatar.url;
    await user.save();
    
    const updatedUser = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
    });

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedUser, "Avatar Changed")
    )
})

const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username?.trim()) {
        throw new ApiError(400, "username is missing");
    }

    const user = await User.findOne({
        where: { username },
        attributes: { exclude: ['password', 'refreshToken'] }
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export { 
    registerUser,
    loginUser,
    logoutUser,refreshAccessToken,
    changeCurrentUserPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    getUserProfile,
}
