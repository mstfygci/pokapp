import './globals.css';

import type { ReactNode } from 'react';

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
