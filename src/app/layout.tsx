import type { Metadata } from 'next';
import { Open_Sans, Roboto_Mono, Bitter } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const bitter = Bitter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-bitter',
});

export const metadata: Metadata = {
  title: 'Summit Kawakami',
  description: 'My portfolio :)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css'
          integrity='sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+'
          crossOrigin='anonymous'
        />
        <link rel='preload' href='/hero_homepage/background_1.svg' as='image' />
        <link rel='preload' href='/hero_homepage/background_2.svg' as='image' />
        <link rel='preload' href='/hero_homepage/background_3.svg' as='image' />
        <link rel='preload' href='/hero_homepage/background_4.svg' as='image' />
        <link rel='preload' href='/hero_homepage/foreground_5.svg' as='image' />
      </head>
      <body
        className={`${openSans.variable} ${robotoMono.variable} ${bitter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
