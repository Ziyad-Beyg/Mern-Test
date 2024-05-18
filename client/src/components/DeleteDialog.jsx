import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomerThunk } from "../redux/slice/customers";
import { useState } from "react";

const DeleteDialog = ({ customerID }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, customersList } = useSelector((state) => state.customer);

  const handleDeleteClick = async () => {
    console.log(isLoading)
    dispatch(deleteCustomerThunk(customerID));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild> */}
      <Button
        onClick={() => setOpen(true)}
        className="w-24 h-9 text-sm bg-[#ef9999] text-[#d80000] hover:bg-[#ef9999]/80 active:scale-95"
      >
        Delete
      </Button>
      {/* </DialogTrigger> */}
      <DialogContent className="sm:max-w-md overflow-hidden ">
        <DialogClose asChild>
          <X className="h-5 w-5 text-black absolute right-4 top-4 z-20 hover:cursor-pointer" />
        </DialogClose>

        <Trash2
          strokeWidth={2}
          className="text-red-600 my-3 w-20 h-20 mx-auto"
        />

        <div className="mb-6">
          <h3 className="text-center text-2xl font-semibold mb-4">
            Are you sure?
          </h3>
          <p className="text-center text-base leading-none text-black">
            Do you really want to delete this customer?
          </p>
          <p className="text-center text-base leading-none text-black">
            This process can not be undone.
          </p>
        </div>

        <div className="flex gap-4 w-full">
          <DialogClose asChild>
            <Button className="text-white flex-1 bg-slate-600 tracking-wide active:scale-95 hover:bg-slate-600/80">
              CANCEL
            </Button>
          </DialogClose>
          <Button
            onClick={handleDeleteClick}
            className="text-white flex-1 bg-red-700 tracking-wide active:scale-95 hover:bg-red-700/80"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin ml-2 " />
            ) : (
              "DELETE"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
