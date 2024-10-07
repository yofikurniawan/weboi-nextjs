// import useSWR from "swr";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";

import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
        <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
