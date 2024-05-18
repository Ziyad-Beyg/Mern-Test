import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerThunk } from "@/redux/slice/customers";

const EditDialog = ({ customer }) => {
  //   const allCustomer = useSelector((state) => state.customer.customersList);

  //   let editableCustomer = allCustomer.find(
  //     (customer) => customer._id === customerID
  //   );

  console.log(customer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: customer.email,
      username: customer.username,
      fullName: customer.fullName,
    },
  });
  const [selectedFilename, setSelectedFilename] = useState(
    customer.pictureName
  );
  const [file, setFile] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  //   const state = useSelector((state) => state.customersList);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setSelectedFilename(file.name);
    } else {
      setSelectedFilename("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const onSubmit = (data) => {
    // if (file.length <= 0) {
    //   setFileError("Profile picture can not be empty");
    //   return false;
    // }

    console.log(customer);

    const formData = new FormData();
    if (file.length >= 0) {
      formData.append("profilePicture", file);
    }
    formData.append("username", data.username.toLowerCase());
    formData.append("email", data.email);
    formData.append("fullName", data.fullName.trim());

    dispatch(updateCustomerThunk(customer._id, formData));

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} className="m-20">
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="w-24 h-9 text-sm bg-[#b0e1b7] text-[#038315] hover:bg-[#b0e1b7]/80 active:scale-95"
      >
        Edit
      </Button>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden ">
        <DialogHeader className="bg-gradient-to-l from-[#3b9876] to-[#4caf89] w-[100%] h-28 flex justify-end items-center">
          <DialogDescription className="text-white text-4xl font-[Platypi] pb-7">
            Edit Customer
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-6 ">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <Input
              {...register("username", { required: "Username is required!" })}
              type="text"
              onKeyDown={handleKeyDown}
              placeholder="username"
              className="border-2 border-slate-300 mt-5 text-black font-medium "
            />
            {errors.username && (
              <div className="text-red-500">{errors.username.message}</div>
            )}

            <Input
              {...register("fullName", {
                required: "Customer name is required!",
                validate: (value) => {
                  if (value.trim() === "") return "Name can not be empty";
                },
              })}
              type="text"
              placeholder="customer name"
              className="border-2 border-slate-300 mt-5 text-black font-medium "
            />
            {errors.fullName && (
              <div className="text-red-500">{errors.fullName.message}</div>
            )}
            <Input
              {...register("email", {
                required: "Email is required!",
                validate: (value) => {
                  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value))
                    return "Invalid Email!";
                },
              })}
              type="email"
              placeholder="email"
              onKeyDown={handleKeyDown}
              className="border-2 border-slate-300 mt-5 text-black font-medium"
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}

            <Label
              htmlFor="picture"
              className=" text-base hover:cursor-pointer mt-5"
            >
              <span className="underline text-[#57bc90]"> Upload Photo</span>
              <span id="selected-filename" className="ml-8 mt-5">
                {selectedFilename}
              </span>
            </Label>
            <Input
              id="picture"
              onChange={handleFileChange}
              type="file"
              className="hidden"
            />

            <Button
              type="submit"
              className="text-white mt-5 bg-gradient-to-l from-[#075446] to-[#52B68C] tracking-wide active:scale-95"
            >
              EDIT CUSTOMER
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
