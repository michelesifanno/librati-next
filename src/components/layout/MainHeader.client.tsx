'use client';

import dynamic from 'next/dynamic';

const MainHeader = dynamic(
  () => import('./MainHeader'),
  { ssr: false }
);

export default MainHeader;