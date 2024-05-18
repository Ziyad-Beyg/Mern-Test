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
      console.log("Error: ", error);
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
      console.log("Error: ", error);
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
      console.log("Error: ", error);
    }
  }
);

// update customer async action
export const updateCustomerThunk = createAsyncThunk(
  "updateCustomer",
  async (id, formData) => {
    try {
      const { data } = await updateCustomer(id, formData);
      return data.data;
    } catch (error) {
      console.log("Error: ", error);
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
      })
      .addCase(createCustomerThunk.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Error: ", action.error.message);
        state.isError = action.error.message;
      })
      // Get all customer
      .addCase(fetchCustomersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCustomersThunk.fulfilled, (state, action) => {
        state.customersList = action.payload;
        state.isLoading = false;
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
        const { id } = action.payload;
        let allCustomers = state.customersList.slice(0);
        if (id) {
          state.customersList = allCustomers.filter((user) => user._id !== id);
        }
        state.isLoading = false;
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
