import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';

const RootLayout = () => {
  return (
    <div>
      <div className="grid-container"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Inspired by ❤ RoadsideCoder and Implemented by Vivek
      </div>
    </div>
  )
}

export default RootLayout;
