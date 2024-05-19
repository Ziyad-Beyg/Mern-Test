import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCustomer,
  deleteCustomer,
  createCustomer,
  updateCustomer,
} from "./customerApi";
import toast from "react-hot-toast";

// Create customer async action
export const createCustomerThunk = createAsyncThunk(
  "createCustomer",
  async (formData) => {
    try {
      const { data } = await createCustomer(formData);
      return data.data;
    } catch (error) {
      if (error.response.status == 409) {
        toast.error("Customer with email or username already exist!");
      } else if (error.response.status == 400) {
        toast.error("Profile Picture Image is required!");
      } else {
        toast.error("Something went wrong while registering customer!");
      }
      throw error;
    }
  }
);

// Fetch all customer async action
export const fetchCustomersThunk = createAsyncThunk(
  "fetchCustomer",
  async (filter) => {
    try {
      let { data } = await fetchCustomer(filter);
      return data.data;
    } catch (error) {
      toast.error("No Customer Found!");
      console.log(error);
      throw error;
    }
  }
);

// Delete customer async action
export const deleteCustomerThunk = createAsyncThunk(
  "deleteCustomer",
  async (id) => {
    try {
      const { data } = await deleteCustomer(id);
      return data.data;
    } catch (error) {
      toast.error("Something went wrong while deleting!");
      console.log(error);
      throw error;
    }
  }
);

// update customer async action
export const updateCustomerThunk = createAsyncThunk(
  "updateCustomer",
  async (customerData) => {
    try {
      const { data } = await updateCustomer(
        customerData?._id,
        customerData?.formData
      );
      return data.data;
    } catch (error) {
      if (error.response.status == 404) {
        toast.error("User does not exist or is deleted!");
      } else {
        toast.error("Something went wrong while updating!");
      }
      console.log(error);
      throw error;
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    isLoading: false,
    customersList: [],
    isError: null,
  },
  extraReducers: (builder) => {
    builder
      // Create customer
      .addCase(createCustomerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customersList.push(action.payload);
        toast.success("Customer Created!");
      })
      .addCase(createCustomerThunk.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Error: ", action);
        state.isError = action.error.message;
      })
      // Get all customer
      .addCase(fetchCustomersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCustomersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customersList = action.payload;
        toast.success("Customer Fetched!");
      })
      .addCase(fetchCustomersThunk.rejected, (state, action) => {
        console.log("Error: ", action.error.message);
        state.isError = action.error.message;
        state.isLoading = false;
      })
      //   Delete customer
      .addCase(deleteCustomerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomerThunk.fulfilled, (state, action) => {
        const { _id } = action.payload;

        if (_id) {
          state.customersList = state.customersList.filter(
            (user) => user._id !== _id
          );
        }
        state.isLoading = false;
        toast.success("Customer Deleted!");
      })
      .addCase(deleteCustomerThunk.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Error: ", action.error.message);
        state.isError = action.error.message;
      })
      //   update customer
      .addCase(updateCustomerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customersList = state.customersList.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        );
        toast.success("Customer Updated!");
      })
      .addCase(updateCustomerThunk.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.error.message);
        console.log("Error: ", action.error.message);
        state.isError = action.error.message;
      });
  },
});

export default customerSlice.reducer;
