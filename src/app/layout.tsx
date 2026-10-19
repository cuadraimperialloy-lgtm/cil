import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Caballos frisones en venta en Jalisco | Cuadra Imperial Loy',
  description:
    'Caballos frisones importados de Holanda, escogidos uno por uno. Véalos en una cita privada en Zapotlanejo, Jalisco. Envíos seguros a todo México.',
  keywords: [
    'caballos frisones en venta',
    'caballos frisones jalisco',
    'cuadra imperial loy',
    'caballos frisones kfps',
    'venta de caballos finos guadalajara',
    'caballos frisones zapotlanejo',
    'friesian horses for sale mexico',
  ],
  authors: [{ name: 'Cuadra Imperial Loy' }],
  metadataBase: new URL('https://cuadraimperialloy.com'),
  openGraph: {
    title: 'Cuadra Imperial Loy · Caballos Frisones de Origen KFPS',
    description: 'Recibe su caballo sano y con papeles de origen. Cita privada en Zapotlanejo, Jalisco.',
    url: 'https://cuadraimperialloy.com',
    siteName: 'Cuadra Imperial Loy',
    images: [
      {
        url: '/brand/Logotipo_Cuadra_Imperial_Loy_horizontal_degradado.svg',
        width: 1200,
        height: 630,
        alt: 'Cuadra Imperial Loy · Caballos Frisones en Jalisco',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  icons: {
    icon: '/brand/Logotipo_Cuadra_Imperial_Loy_isotipo_degradado.svg',
    shortcut: '/brand/Logotipo_Cuadra_Imperial_Loy_isotipo_degradado.svg',
    apple: '/brand/Logotipo_Cuadra_Imperial_Loy_isotipo_degradado.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0B0B0B] text-[#F4EADB] antialiased selection:bg-[#D4AF37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
