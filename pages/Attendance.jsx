import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import DashboardNavbar from "@/components/DashNav";
import { useMediaQuery } from "react-responsive";
import {
  Battery0Icon,
  Battery50Icon,
  Battery100Icon,
} from "@heroicons/react/24/solid";
import { Chip } from "@material-tailwind/react";

const Attendance = () => {
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://216.185.57.69/eStock/api/Attendance/fetchAttendance_DateRange",
        {
          FromDate: "2013-12-01",
          ToDate: "2023-12-01",
        }
      );
      setAttendanceData(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error(
          "Error response:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const getBatteryIcon = (batteryPercentage) => {
    if (batteryPercentage <= 20) {
      return <Battery0Icon className="w-5 h-5 text-red-500" />;
    } else if (batteryPercentage <= 49) {
      return <Battery50Icon className="w-5 h-5 text-yellow-500" />;
    } else {
      return <Battery100Icon className="w-5 h-5 text-green-500" />;
    }
  };

  const getAttendanceChipColor = (attendance) => {
    switch (attendance) {
      case "P":
        return "green";
      case "absent":
        return "red";
      default:
        return "amber";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-poppinsBold">
      <div className="p-4">{isTablet ? <Header /> : <DashboardNavbar />}</div>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full rounded-xl">
          <thead>
            <tr className="rounded-lg">
              <th className="border bg-gray-400 px-4 py-2">SNo.</th>
              <th className="border bg-gray-400 px-4 py-2">Employee</th>
              <th className="border bg-gray-400 px-4 py-2">Attendance</th>
              <th className="border bg-gray-400 px-4 py-2">Work Type</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}.</td>
                <td className="border px-4 py-2">{item.Sname}</td>
                <td className="border px-4 py-2">
                  <span style={{ display: "inline-block" }}>
                    <Chip
                      color={getAttendanceChipColor(item.Attendance)}
                      size="lg"
                      value={item.Attendance}
                    />
                  </span>
                </td>
                <td className="border px-4 py-2 flex flex-row gap-2">
                  {getBatteryIcon(item.Battery)}{item.Battery}%
                  <span className="text-gray-900">{item.workingPlace}</span>
                  <span className="text-gray-900">{item.WorkingArea}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;

