'use client';

import dynamic from 'next/dynamic';

const HextarMap = dynamic(() => import('./HextarMap'), { ssr: false });

export default function HextarMapClient() {
  return <HextarMap />;
}
