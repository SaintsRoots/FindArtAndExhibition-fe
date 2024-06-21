import React from 'react';
import { artistNav } from '../components/JsonData/artistNav';
import Layout from '../layouts/Layout';

const ArtistLayout = () => {
  return (
    <Layout navItems={artistNav} topNavProps={{ isAdmin: false }} />
  );
};

export default ArtistLayout;
