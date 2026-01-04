import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import AviationNavbar from "@/components/AviationNavbar";

export const metadata: Metadata = {
  title: 'Schroeder Parts | Premium Balloon Components',
  description: 'Official spare parts shop for Schroeder Fire Balloons.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AviationNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
