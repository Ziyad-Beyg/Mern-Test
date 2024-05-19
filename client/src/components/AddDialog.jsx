import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { createCustomerThunk } from "@/redux/slice/customers";
import toast from "react-hot-toast";

const AddDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedFilename, setSelectedFilename] = useState("");
  const [file, setFile] = useState([]);
  const [fileError, setFileError] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.customer);

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
    try {
      if (file.length <= 0) {
        setFileError("Profile picture can not be empty");
        return false;
      }

      const formData = new FormData();
      formData.append("profilePicture", file);
      formData.append("username", data.username.toLowerCase());
      formData.append("email", data.email);
      formData.append("fullName", data.fullName.trim());

      dispatch(createCustomerThunk(formData)).then(() => {
        setOpen(false);
      });

      reset();
      setFile([]);
      setSelectedFilename("");
      setOpen(false);
    } catch (error) {
      console.log("Error", error.message);
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-white font-normal text-base py-6 px-7 active:scale-95"
          style={{
            backgroundImage:
              "linear-gradient(to left, rgb(7, 84, 70), rgb(63, 157, 122))",
          }}
        >
          <Plus className="w-6 h-6 mr-4" /> ADD NEW CUSTOMER
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden ">
        <DialogHeader className="bg-gradient-to-l from-[#3b9876] to-[#4caf89] w-[100%] h-28 flex justify-end items-center">
          <DialogDescription className="text-white text-4xl font-[Platypi] pb-7">
            Add New Customer
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
            {file.length <= 0 && (
              <div className="text-red-500">{fileError}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className={` text-white mt-5 bg-gradient-to-l from-[#075446] to-[#52B68C] tracking-wide active:scale-95`}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin ml-2 " />
              ) : (
                "ADD CUSTOMER"
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
