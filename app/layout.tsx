import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Mono, Crimson_Pro } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
});

export const metadata: Metadata = {
  title: 'Scheda Degustazione — CCA',
  description: 'Scheda Ufficiale di Degustazione del Sigaro — Cigar Club Association',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} ${dmMono.variable} ${crimsonPro.variable}`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
