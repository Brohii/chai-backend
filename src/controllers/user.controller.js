import {asyncHandler} from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
//const router = express.Router();

const registerUser = asyncHandler(async (req,res)=>{
  
  const {username, email, password, fullName} = req.body

// Validation
  if(
    [username,email,password ,fullName,].some( (field)=>field?.trim() === "" )

  ){    
    throw new ApiError(400, "All fields are required")
  } 



// check if user Exists Already
  const existedUser = User.findOne({
    $or: [ { email } , { username } ]
  })

  if(existedUser){
    throw new ApiError(409,"User with this Email or Username already exists")
  }

//localFilePath finding

const avatarLocalPath = req.files?.avatar[0]?.path
const coverImageLocalPath = req.files?.coverImage[0]?.path

if(!avatarLocalPath){
  throw new ApiError(400, "Avatar file is Required")
}


const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)


if(!avatar){
  throw new ApiError(400, "Avatar file is Required")
}



  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase(),
    email,
    password

  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshTokens"
  )

  if(!createdUser){
    throw new ApiError(500, "Something went wrong in registering the user" )
  }


  return res.status(201).json(
    new ApiResponse(200,createdUser, " User Registered Successfully ")
  )

})

export {registerUser}

