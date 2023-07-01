import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";

const TestSidebar = ({ children }) => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="flex font-poppinsBold">
      <div className="fixed w-20 md:w-60 h-screen p-2 bg-white border-r-[1px] flex flex-col justify-between">
        <List>
        <div className="flex flex-col items-center font-poppinsBold">
            <Link href="/">
              <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
                <RxSketchLogo size={20} />
              </div>
            </Link>
            <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          </div>
          <Link href="/">
          <ListItem className="font-poppinsBold mt-2">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
            <ListItemSuffix>
            </ListItemSuffix>
          </ListItem>
          </Link>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-poppinsBold">
                  Master
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 font-poppinsBold">
              <Link href="/customers">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Customer
                </ListItem>
                </Link>
                <Link href="/orders">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Products
                </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <Link href="/orders">
          <ListItem className="font-poppinsBold">
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Orders
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          </Link>
          <Link href="/customers">
          <ListItem className="font-poppinsBold">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Customers
          </ListItem>
          </Link>
          <ListItem className="font-poppinsBold">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem className="font-poppinsBold">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </div>
      <main className="ml-20 md:ml-60 w-full">{children}</main>
    </div>
  );
};

export default TestSidebar;
