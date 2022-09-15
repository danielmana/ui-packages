import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import Hero from 'docs/src/components/home/Hero';
import BrandingProvider from 'docs/src/BrandingProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import Divider from '@mui/material/Divider';

export default function Home() {
  return (
    <BrandingProvider>
      <Head
        title="UI Packages: The React component library you always wanted"
        description="UI Packages provides a simple, customizable, and accessible library of React components. You will develop React applications faster."
      />
      <AppHeader />
      <Divider />
      <main id="main-content">
        <Hero />
      </main>
    </BrandingProvider>
  );
}
