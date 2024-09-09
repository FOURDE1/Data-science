
import React from 'react';
import SideNav from './SideNav';
import '../Css/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <SideNav />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
