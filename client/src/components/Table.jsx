import { ChevronsUpDown } from "lucide-react";
import DeleteDialog from "./DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomersThunk } from "@/redux/slice/customers";
import { useState } from "react";
import { lineSpinner } from "ldrs";
import EditDialog from "./EditDialog";
import { useEffectAfterMount } from "@/hooks/useEffectAfterMount";

const Table = () => {
  lineSpinner.register();
  const dispatch = useDispatch();
  const { customersList, isLoading } = useSelector(
    (state) => state.customer
  );

  const [sortingField, setSortingField] = useState("username");

  const handleDispatch = () => {
    dispatch(fetchCustomersThunk(sortingField));
  };

  useEffectAfterMount(() => {
    handleDispatch();
  }, [sortingField]);

  return (
    <>
      {isLoading ? (
        <div className="w-full  flex justify-center items-center mt-20">
          <l-line-spinner
            size="100"
            stroke="6"
            speed="1"
            color="black"
          ></l-line-spinner>
        </div>
      ) : customersList && customersList.length > 0 ? (
        <div className={`overflow-x-scroll xl:overflow-hidden`}>
          <table className="space-y-10 min-w-full font-sans table-auto mr-10">
            <thead>
              <tr className="py-2 rounded-md px-2 w-full bg-[#c5e3d5] text-[#015249]  flex items-center gap-5">
                <th className="w-[140px] lg:w-[160px] h-5"></th>
                <th
                  onClick={() => setSortingField("username")}
                  align="left"
                  className="flex hover:cursor-pointer active:scale-95 w-[140px] lg:w-[170px] "
                >
                  Username <ChevronsUpDown className="w-3 stroke-2" />
                </th>
                <th
                  onClick={() => setSortingField("fullName")}
                  align="left"
                  className="flex hover:cursor-pointer active:scale-95 w-[140px] lg:w-[170px] "
                >
                  Customer Name <ChevronsUpDown className="w-3 stroke-2" />
                </th>
                <th
                  onClick={() => setSortingField("email")}
                  align="left"
                  className="flex hover:cursor-pointer active:scale-95 w-[250px]"
                >
                  Email <ChevronsUpDown className="w-3 stroke-2" />
                </th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {customersList &&
                customersList.map((customer) => (
                  <tr
                    key={customer && customer._id}
                    className="bg-white rounded-md mt-5 px-2 py-1 grid grid-flow-col gap-5 justify-items-start items-center w-full"
                  >
                    <td className="w-[140px]">
                      <img
                        src={customer && customer.profilePicture}
                        alt="user image"
                        width={100}
                        height={100}
                        className="object-contain max-h-[140px] rounded-xl min-w-[120px]"
                      />
                    </td>
                    <td className="w-[140px] ">
                      {customer && customer.username}
                    </td>
                    <td className="text-[#57bc90] underline w-[140px]">
                      {customer && customer.fullName}
                    </td>
                    <td className="w-[250px] ">{customer && customer.email}</td>
                    <td className="space-x-5 min-w-max ">
                      <EditDialog customer={customer && customer} />
                      <DeleteDialog customerID={customer && customer._id} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        "NO DATA AVAILABLE!"
      )}
    </>
  );
};

export default Table;
