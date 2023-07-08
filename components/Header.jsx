import React from "react";
import profile from "../public/download.jpeg"
import { Typography } from "@material-tailwind/react";

const Header = () => {
  return (
    <div className="flex justify-between p-4 font-poppinsBold">
      <Typography variant="h3" className="font-poppinsThin">Dashboard</Typography>
      {/* <Avatar src={profile} alt="avatar" /> */}
    </div>
  );
};

export default Header;
