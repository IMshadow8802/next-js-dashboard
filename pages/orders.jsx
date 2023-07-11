import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { data } from '../data/data.js';
import { useMediaQuery } from 'react-responsive';
import DashboardNavbar from '@/components/DashNav.jsx';
import Header from '@/components/Header.jsx';

const orders = () => {
  const isTablet = useMediaQuery({ maxWidth: 768 });
  return (
    <div className='bg-gray-100 min-h-screen font-poppinsBold'>
      <div className='flex justify-between px-4 pt-4 font-poppinsBold'>
      {isTablet ? <Header /> : <DashboardNavbar />}
      </div>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white/70 overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <span className='font-poppinsBold'>Order</span>
            <span className='sm:text-left text-right font-poppinsBold'>Status</span>
            <span className='hidden md:grid font-poppinsBold'>Last Order</span>
            <span className='hidden sm:grid font-poppinsBold'>Method</span>
          </div>
          <ul>
            {data.map((order, id) => (
              <li
                key={id}
                className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'
              >
                <div className='flex'>
                  <div className='bg-purple-100 p-3 rounded-lg'>
                    <FaShoppingBag className='text-purple-800' />
                  </div>
                  <div className='pl-4'>
                    <p className='text-gray-800 font-poppinsBold'>
                    ₹{order.total.toLocaleString()}
                    </p>
                    <p className='text-gray-800 text-sm font-poppinsBold'>{order.name.first}</p>
                  </div>
                </div>
                <p className='text-gray-600 sm:text-left text-right font-poppinsBold'>
                  <span
                    className={
                      order.status == 'Processing'
                        ? 'bg-green-200 p-2 rounded-lg'
                        : order.status == 'Completed'
                        ? 'bg-blue-200 p-2 rounded-lg'
                        : 'bg-yellow-200 p-2 rounded-lg'
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <p className='hidden md:flex font-poppinsBold'>{order.date}</p>
                <div className='sm:flex hidden justify-between items-center font-poppinsBold'>
                  <p>{order.method}</p>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default orders;