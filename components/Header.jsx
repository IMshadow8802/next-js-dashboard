import React from "react";
import profile from "../public/download.jpeg";
import { Typography, Breadcrumbs } from "@material-tailwind/react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <div className="flex justify-between p-4 font-poppinsBold">
      <div className="capitalize">
        <Breadcrumbs className="bg-transparent p-0 transition-all mt-1">
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
          >
            <a href="/">Home</a>
          </Typography>
          {layout && (
            <Typography variant="h6" color="blue-gray" className="font-normal">
              {layout}
            </Typography>
          )}
          {page && (
            <Typography variant="h6" color="blue-gray" className="font-normal">
              {page}
            </Typography>
          )}
        </Breadcrumbs>
        {page && (
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Header;
