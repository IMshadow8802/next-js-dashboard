import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { RxSketchLogo } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";

function SideNavbar({ children, brandName, brandImg }) {
  const [isMasterMenuOpen, setIsMasterMenuOpen] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Add state for sidebar open/closed
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!isTablet) {
      setIsSidebarOpen(true);
    } else if (isTablet) {
      setIsSidebarOpen(false);
    }
  }, [isTablet]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="bg-gray-100">
      <Disclosure as="nav">
        {isTablet && (
          <Disclosure.Button
            className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
            onClick={handleSidebarToggle} // Add onClick event handler for sidebar toggle
          >
            <GiHamburgerMenu aria-hidden="true" />
          </Disclosure.Button>
        )}
        <div
          className={`p-4 rounded-2xl mt-4 mb-4 mr-1 ml-2 h-[calc(100vh-32px)] bg-gradient-to-br from-blue-gray-800 to-blue-gray-900 shadow-md shadow-blue-gray-500/5 z-20 fixed top-0 ${
            isSidebarOpen ? "left-0" : "-left-full"
          } w-72 transition-all duration-300`}
        >
          <div className="flex flex-col justify-start item-center">
            <div className="flex flex-row gap-2">
              <Avatar src={brandImg} size="sm" />
              {brandName && (
                <Typography variant="h6" color={"white"} className="font-Poppins">
                  {brandName}
                </Typography>
              )}
            </div>
            <span className="border-b-[3px] border-white/20 w-full p-2"></span>
            <div className="my-4 border-b-[3px] border-white/20 pb-4 flex flex-col">
              <Link href="/">
                <div
                  className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900/40 p-3 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                    selectedItem === "dashboard" ? "bg-gradient-to-br from-blue-500 to-blue-700 " : ""
                  }`}
                  onClick={() => handleItemClick("dashboard")}
                >
                  <MdOutlineSpaceDashboard className="text-2xl text-white group-hover:text-white " />
                  <h3 className="text-base text-white group-hover:text-white font-Poppins ">
                    Dashboard
                  </h3>
                </div>
              </Link>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button>
                      <div
                        className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900/40 p-3 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                          selectedItem === "master" ? "bg-gradient-to-br from-blue-500 to-blue-700 " : ""
                        }`}
                        onClick={() => handleItemClick("master")}
                      >
                        <MdOutlineIntegrationInstructions className="text-2xl text-white group-hover:text-white " />
                        <h3 className="text-base text-white group-hover:text-white font-Poppins ">
                          Master
                        </h3>

                        {isMasterMenuOpen ? (
                          <ChevronDownIcon className="h-5 w-8 text-white group-hover:text-white" />
                        ) : (
                          <ChevronRightIcon className="h-5 w-8 text-white group-hover:text-white" />
                        )}
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className="pl-4">
                      <Link href="/Brand">
                        <div
                          className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900/40 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                            selectedItem === "brand" ? "bg-gradient-to-br from-blue-500 to-blue-700 " : ""
                          }`}
                          onClick={() => handleItemClick("brand")}
                        >
                          <FaRegComments className="text-2xl text-white group-hover:text-white " />
                          <h3 className="text-base text-white group-hover:text-white font-Poppins ">
                            Brand
                          </h3>
                        </div>
                      </Link>
                      <Link href="/customers">
                        <div
                          className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900/40 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                            selectedItem === "customers" ? "bg-gradient-to-br from-blue-500 to-blue-700 " : ""
                          }`}
                          onClick={() => handleItemClick("customers")}
                        >
                          <MdOutlineAnalytics className="text-2xl text-white group-hover:text-white " />
                          <h3 className="text-base text-white group-hover:text-white font-Poppins ">
                            Customer
                          </h3>
                        </div>
                      </Link>
                      <Link href="/orders">
                        <div
                          className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900/40 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                            selectedItem === "orders" ? "bg-gradient-to-br from-blue-500 to-blue-700 " : ""
                          }`}
                          onClick={() => handleItemClick("orders")}
                        >
                          <BiMessageSquareDots className="text-2xl text-white group-hover:text-white " />
                          <h3 className="text-base text-white group-hover:text-white font-Poppins ">
                            Orders
                          </h3>
                        </div>
                      </Link>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Link href="/Task">
                <div
                  className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900/40 p-3 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                    selectedItem === "task" ? "bg-gradient-to-br from-blue-500 to-blue-700 " : ""
                  }`}
                  onClick={() => handleItemClick("task")}
                >
                  <MdOutlineSpaceDashboard className="text-2xl text-white group-hover:text-white " />
                  <h3 className="text-base text-white group-hover:text-white font-Poppins ">
                    Task
                  </h3>
                </div>
              </Link>
              <Link href="/Kanban">
                <div
                  className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900/40 p-3 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                    selectedItem === "kanban" ? "bg-gradient-to-br from-blue-500 to-blue-700 " : ""
                  }`}
                  onClick={() => handleItemClick("kanban")}
                >
                  <MdOutlineSpaceDashboard className="text-2xl text-white group-hover:text-white " />
                  <h3 className="text-base text-white group-hover:text-white font-Poppins ">
                    Kanban
                  </h3>
                </div>
              </Link>
            </div>
            {/* setting  */}
            <div className="my-2 border-b-[3px] border-white/20 pb-2">
              <div
                className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900/40 p-3 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                  selectedItem === "settings" ? "bg-gradient-to-br from-blue-500 to-blue-700 " : ""
                }`}
                onClick={() => handleItemClick("settings")}
              >
                <MdOutlineSettings className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-Poppins ">
                  Settings
                </h3>
              </div>
            </div>
            {/* logout */}
            <div className="my-2">
              <Link href="/SignIn">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-white/20 hover:bg-gray-900/40  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-Poppins ">
                  Logout
                </h3>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </Disclosure>
      <main
        className={`${isTablet ? "ml-0" : "ml-72"} flex-grow`}
        //className="ml-0 sm:ml-0 md:ml-72 flex-grow"
      >
        {children}
      </main>
    </div>
  );
}

SideNavbar.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "CRM",
};

SideNavbar.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
};

SideNavbar.displayName = "/components/SideNavbar.jsx";

export default SideNavbar;
