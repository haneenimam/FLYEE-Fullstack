import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Flyee',
  description: 'A modern booking interface built with Next.js and Node.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <Toaster position="top-right" richColors />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

