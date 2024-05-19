import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

export const createCustomer = async (formData) => {
  return await axios.post(`${BASE_URL}/add-customer`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchCustomer = async (filter) => {
  return await axios.get(`${BASE_URL}/get-all-customers/${filter}`);
};

export const deleteCustomer = async (id) => {
  return await axios.put(`${BASE_URL}/delete-customer/${id}`);
};

export const updateCustomer = async (id, formData) => {
  return await axios.put(`${BASE_URL}/update-customer/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
