import React from 'react';
import { adminNav } from '../components/JsonData/adminNav';
import Layout from '../layouts/Layout';

const DashLayout = () => {
  return (
    <Layout navItems={adminNav} topNavProps={{ isAdmin: true }} />
  );
};

export default DashLayout;
