import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
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
import React, { useState } from "react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { RxSketchLogo} from "react-icons/rx";
import { useMediaQuery } from 'react-responsive';

function SideNavbar({ children }) {
    const [isMasterMenuOpen, setIsMasterMenuOpen] = useState(false);
    const isTablet = useMediaQuery({ maxWidth: 768 });  
    return (
      <div>
        <Disclosure as="nav">
          <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
            {/* <GiHamburgerMenu className="block md:hidden h-6 w-6" aria-hidden="true" /> */}
            <GiHamburgerMenu className={`block md:${isTablet ? '' : 'hidden'} aria-hidden="true"`} />
          </Disclosure.Button>
          <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
            <div className="flex flex-col justify-start item-center">
              <Link href="/">
                <div className="bg-purple-800 text-white p-3 rounded-lg inline-block cursor-pointer">
                  <RxSketchLogo size={20} />
                </div>
              </Link>
              <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
              <div className="my-4 border-b border-gray-100 pb-4">
                <Link href="/">
                  <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                    <h3 className="text-base text-gray-800 group-hover:text-white font-poppinsBold ">
                      Dashboard
                    </h3>
                  </div>
                </Link>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        onClick={() => setIsMasterMenuOpen(!isMasterMenuOpen)}

                      >
                        <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                        <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
                        <h3 className="text-base text-gray-800 group-hover:text-white font-poppinsBold ">
                          Master
                        </h3>
                        
                        {isMasterMenuOpen ? (
                          <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-white" />
                        ) : (
                          <ChevronRightIcon className="h-5 w-5 text-gray-600 group-hover:text-white" />
                        )}
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="pl-4">
                      <Link href="/Brand">
                        <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                          <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
                          <h3 className="text-base text-gray-800 group-hover:text-white font-poppinsBold ">
                            Brand
                          </h3>
                        </div>
                        </Link>
                        <Link href="/customers">
                        <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                          <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
                          <h3 className="text-base text-gray-800 group-hover:text-white font-poppinsBold ">
                            Customer
                          </h3>
                        </div>
                        </Link>
                        <Link href="/orders">
                        <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                          <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
                          <h3 className="text-base text-gray-800 group-hover:text-white font-poppinsBold ">
                            Orders
                          </h3>
                        </div>
                        </Link>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              {/* setting  */}
              <div className="my-4 border-b border-gray-100 pb-4">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-poppinsBold ">
                    Settings
                  </h3>
                </div>
              </div>
              {/* logout */}
              <div className="my-4">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-poppinsBold ">
                    Logout
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Disclosure>
        <main className={`ml-0 sm:ml-0 md:${isTablet ? 'ml-0' : 'ml-60'} flex-grow`}>{children}</main>
      </div>
    );
  }

export default SideNavbar;