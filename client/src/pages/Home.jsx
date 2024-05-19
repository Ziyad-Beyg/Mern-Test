import AddDialog from "@/components/AddDialog";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";

const Home = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(BASE_URL);
  return (
    <div className="lg:w-screen h-screen flex overflow-x-hidden bg-slate-200">
      <Sidebar />
      <div className="bg-slate-200 w-[100%] pb-20 ">
        <div className="bg-white flex items-center h-[100px] shadow-md">
          <h2 className="ml-10 text-2xl font-bold">CUSTOMERS</h2>
        </div>
        <div className="pt-10 lg:px-20 px-5 space-y-10">
          <AddDialog
            triggerText={"add"}
            title={"ADD NEW CUSTOMER"}
            btnText={"ADD CUSTOMER"}
          />
          <div className="pb-20 ">
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
