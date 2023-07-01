import React from "react";
import profile from "../public/download.jpeg"
import { Avatar } from "@material-tailwind/react";

const Header = () => {
  return (
    <div className="flex justify-between p-4 font-poppinsBold">
      <h1>Dashboard</h1>
      <Avatar src={profile} alt="avatar" />
    </div>
  );
};

export default Header;
