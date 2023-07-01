
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { Tooltip } from "@material-tailwind/react";

const Sidebar = ({ children }) => {
  return (
    <div className="flex ">
      <div className="fixed w-20 md:w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center font-hankenExtraBold">
          <Link href="/">
              <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
                <RxSketchLogo size={20} />
              </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/">
          <Tooltip
              className="bg-white border border-blue-gray-50 shadow-xl shadow-black/10 px-4 py-3 text-black font-hankenRegular"
              content="Dashboard"
              placement="right"
            >
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <RxDashboard size={20} />
            </div>
            </Tooltip>
          </Link>
          <Link href="/customers">
          <Tooltip
              className="bg-white border border-blue-gray-50 shadow-xl shadow-black/10 px-4 py-3 text-black font-hankenRegular"
              content="Customers"
              placement="right"
            >
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <RxPerson size={20} />
            </div>
            </Tooltip>
          </Link>
          <Link href="/orders">
          <Tooltip
              className="bg-white border border-blue-gray-50 shadow-xl shadow-black/10 px-4 py-3 text-black font-hankenRegular"
              content="Orders"
              placement="right"
            >
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <HiOutlineShoppingBag size={20} />
            </div>
            </Tooltip>
          </Link>
          <Link href="/test">
          <Tooltip
              className="bg-white border border-blue-gray-50 shadow-xl shadow-black/10 px-4 py-3 text-black font-hankenRegular"
              content="Master"
              placement="right"
            >
            <div
              className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <FiSettings size={20} />
            </div>
            </Tooltip>
          </Link>
        </div>
      </div>
      <main className="ml-20 md:ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;



