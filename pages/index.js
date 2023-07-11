import React from "react"
import BarChart from "@/components/BarChart"
import Header from "@/components/Header"
import RecentOrders from "@/components/RecentOrders"
import Task from "@/components/Task"
import DashboardNavbar from "@/components/DashNav"
import StatisticsCard from "@/components/StatisticsCard"
import statisticsCardsData from "@/data/statistics-cards-data"
import {
  Typography,
} from "@material-tailwind/react";
import { useMediaQuery } from "react-responsive";


export default function Home() {
  const isTablet = useMediaQuery({ maxWidth: 768 });
  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="p-4">
      {isTablet ? <Header /> : <DashboardNavbar />}
      </div>      
      <div className="mt-0 mb-0 p-4 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      {/* <TopCards/> */}
      <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
          <BarChart />
          <Task />
        </div>
    </main>
  )
}
