import logo from "@/assets/logo.svg";
import responsiveLogo from "@/assets/responsiveLogo.svg";
import { Button } from "./ui/button";
import { Users } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="sticky top-0 min-w-max px-4 lg:px-0 lg:w-[20%] py-16 gap-14 lg:gap-20 bg-[#015249] z-10 flex flex-col items-center rounded-tr-2xl rounded-br-2xl ">
      <img
        src={logo}
        className="object-contain hidden lg:block"
        alt="logo"
        width={200}
        height={200}
      />

      <img
        src={responsiveLogo}
        className="object-contain max-w-14 lg:hidden"
        alt="logo"
        width={40}
        height={40}
      />

      <div className="w-[98%] lg:w-[60%]">
        <Button className="hidden  lg:flex w-full bg-[#043933] outline-none hover:cursor-default hover:bg-[#043933] text-base py-2 px-4">
          <Users className="w-5 h-5 mr-4 shrink-0" />
          CUSTOMERS
        </Button>
        <Users className="w-5 h-5 mx-auto text-white shrink-0 lg:hidden" />
      </div>
    </div>
  );
};

export default Sidebar;
