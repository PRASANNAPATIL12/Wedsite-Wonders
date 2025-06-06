import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added for AI tool feedback

export const metadata: Metadata = {
  title: 'Wedsite Wonders - Beautiful Wedding Invitations Made Simple',
  description: 'Create stunning, personalized wedding invitation websites with our elegant templates and interactive 3D features.',
  openGraph: {
    title: 'Wedsite Wonders - Beautiful Wedding Invitations',
    description: 'Create stunning wedding invitation websites with elegant templates',
    // og:image should be an absolute URL, e.g., from a CDN or public folder after deployment
    // images: ['/assets/og-image.jpg'], // Placeholder, as generating images is not possible
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
