import { Customer } from "../models/customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

//  add customer
const addCustomer = AsyncHandler(async (req, res) => {
  try {
    const { username, email, fullName } = req.body;

    if ([username, email, fullName].some((fields) => fields?.trim() === "")) {
      throw new ApiError(400, "All fields are required!");
    }

    const existedCustomer = await Customer.findOne({
      $and: [{ $or: [{ email }, { username }] }, { isDeleted: false }],
    });

    if (existedCustomer) {
      throw new ApiError(409, "Customer with email or username already exist!");
    }

    let profilePictureLocalFilePath;


    if (
      req.files &&
      Array.isArray(req.files.profilePicture) &&
      req.files.profilePicture.length > 0
    ) {
      profilePictureLocalFilePath = req.files?.profilePicture[0]?.path;
    } else {
      throw new ApiError(400, "Profile Picture is required!");
    }

    const profilePicture = await uploadOnCloudinary(
      profilePictureLocalFilePath
    );

    if (!profilePicture) {
      throw new ApiError(400, "Profile Picture is required!");
    }

    let customer = await Customer.create({
      fullName,
      email,
      username: username.toLowerCase(),
      profilePicture: profilePicture.url,
      pictureName: `${profilePicture?.original_filename}.${profilePicture?.format}`,
    });

    const createdCustomer = await Customer.findById(customer._id);

    if (!createdCustomer) {
      throw new ApiError(
        500,
        "Something went wrong while registering customer!"
      );
    }

    res
      .status(201)
      .json(
        new ApiResponse(
          200,
          createdCustomer,
          "Customer registered successfully!"
        )
      );
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

// get all customers
const getAllCustomers = AsyncHandler(async (req, res) => {
  try {
    const { filter } = req.params;
    if (!filter || filter.trim() === "") {
      throw new ApiError(404, "No Filter Found!");
    }
    const sortObject = {};
    sortObject[filter] = 1;
    const allCustomers = await Customer.find({ isDeleted: false }).sort(
      sortObject
    );

    if (!allCustomers || allCustomers.length <= 0) {
      throw new ApiError(404, "No Customer Found!");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          allCustomers,
          `List of sorted Customers w.r.t ${filter}`
        )
      );
  } catch (error) {
    console.error("API Error:", error);
    res.status(error.statusCode || 500).json({
      statusCode: error.statusCode,
      success: false,
      message: error.message,
      errors: error.errors,
    });
    throw error;
  }
});

// update customer
const updateCustomer = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(404, "No ID Found!");
    }

    const userExist = await Customer.findOne({ _id: id, isDeleted: false });

    if (!userExist) {
      throw new ApiError(404, "User does not exist or is deleted!");
    }

    const data = {
      ...req.body,
    };

    let updatedProfilePictureFilePath;

    if (
      req.files &&
      Array.isArray(req.files.profilePicture) &&
      req.files.profilePicture.length > 0
    ) {
      updatedProfilePictureFilePath = req.files?.profilePicture[0]?.path;
    }

    const UpdateProfilePicture = await uploadOnCloudinary(
      updatedProfilePictureFilePath
    );

    if (UpdateProfilePicture) {
      data.profilePicture = UpdateProfilePicture.url;
      data.pictureName = `${UpdateProfilePicture?.original_filename}.${UpdateProfilePicture?.format}`;
    }

    const update = await Customer.findByIdAndUpdate(id, data);
    if (!update) {
      throw new ApiError(500, "Something went wrong while updating customer!");
    }

    const updatedCustomer = await Customer.findById(id);
    res
      .status(200)
      .json(new ApiResponse(200, updatedCustomer, `Customer updated!`));
  } catch (error) {
    console.error("API Error:", error);
    res.status(error.statusCode || 500).json({
      statusCode: error.statusCode,
      success: false,
      message: error.message,
      errors: error.errors,
    });
    throw error;
  }
});

// delete customer
const deleteCustomer = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(404, "No ID Found!");
    }
    const deleted = await Customer.findByIdAndUpdate(id, { isDeleted: true });
    if (!deleted) {
      throw new ApiError(500, "Something went wrong while deleting customer!");
    }
    const deletedCustomer = await Customer.findById(id);

    res
      .status(200)
      .json(new ApiResponse(200, deletedCustomer, `Customer deleted!`));
  } catch (error) {
    console.error("API Error:", error);
    res.status(error.statusCode || 500).json({
      statusCode: error.statusCode,
      success: false,
      message: error.message,
      errors: error.errors,
    });
  }
  throw error;
});

export { addCustomer, getAllCustomers, updateCustomer, deleteCustomer };
