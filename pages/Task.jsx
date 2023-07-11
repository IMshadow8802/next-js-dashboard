"use client";
import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import DashboardNavbar from "@/components/DashNav.jsx";
import Header from "@/components/Header.jsx";
import { taskData } from "@/data/taskData";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardHeader,
  Select,
  Input,
  CardFooter,
  Textarea,
  Option
} from "@material-tailwind/react";

const Task = () => {
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const [openDialog, setOpenDialog] = useState(false);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTask("");
    setDescription("");
    setStatus("Todo");
  };

  const handleAddTask = () => {
    // Add task logic here
    console.log("Task:", task);
    console.log("Description:", description);
    console.log("Status:", status);
    handleCloseDialog();
  };
  return (
    <div className="bg-gray-100 min-h-screen font-poppinsBold">
      <div className="flex justify-between px-4 pt-4 font-poppinsBold">
        {isTablet ? <Header /> : <DashboardNavbar />}
      </div>
      <div className="p-4">
        <div className="pt-2 pb-2 flex justify-end">
          <Button color="blue" variant="filled" onClick={handleOpenDialog}>
            Add Tasks
          </Button>
        </div>
        <div className="w-full m-auto p-4 border rounded-lg bg-white/70 overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span className="font-poppinsBold">Task</span>
            <span className="sm:text-left text-right font-poppinsBold">
              Assigned To
            </span>
            <span className="hidden md:grid font-poppinsBold">Status</span>
            <span className="hidden sm:grid font-poppinsBold">Last update</span>
          </div>
          <ul>
            {taskData.map((order, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800">{order.task}</p>
                  </div>
                </div>
                <p>{order.name.first}</p>
                <p className="text-gray-800 sm:text-left text-right">
                  <span
                    className={
                      order.status == "Done"
                        ? "bg-green-400 p-2 rounded-lg"
                        : order.status == "Doing"
                        ? "bg-blue-400 p-2 rounded-lg"
                        : "bg-yellow-500 p-2 rounded-lg"
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <div className="sm:flex hidden justify-between items-center font-poppinsBold">
                  <p className="hidden md:flex font-poppinsBold">
                    {order.date}
                  </p>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Dialog
          size="sm"
          open={openDialog}
          handler={handleCloseDialog}
          className="bg-transparent shadow-none"
        >
          <Card>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <h3 className="text-white font-poppinsBold">Add Task</h3>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input variant="outlined" label="Outlined" />
              <Textarea label="Description" />
              <Select color="blue" label="Status">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
              </Select>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleAddTask} fullWidth>
                Add
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </div>
    </div>
  );
};

export default Task;
