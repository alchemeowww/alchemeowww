'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState(2023);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-brown text-white text-center p-4 font-semibold">
      <span>{year}</span> &copy; Alchemeowww. All Rights Reserved.
    </footer>
  );
}