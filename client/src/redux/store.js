import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slice/customers";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
});
