import type { Metadata } from 'next';

import nextSEOConfig from 'config/next-seo.config';
import { Inter } from 'next/font/google';
import 'ui/styles/globals.css';
import AppProviders from 'utils/AppProviders';

export const metadata: Metadata = {
  title: nextSEOConfig.openGraph.site_name,
  description: nextSEOConfig.description,
  openGraph: {
    title: nextSEOConfig.openGraph.site_name,
    description: nextSEOConfig.description,
    url: nextSEOConfig.openGraph.url,
    siteName: nextSEOConfig.openGraph.site_name,
    images: [
      {
        url: `${nextSEOConfig.openGraph.url}/cover.jpeg`,
        width: 876,
        height: 438,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  themeColor: '#6b63ff',
  twitter: {
    card: 'summary_large_image',
    creator: nextSEOConfig.twitter.handle,
    title: nextSEOConfig.openGraph.site_name,
    description: nextSEOConfig.description,
    site: nextSEOConfig.twitter.site,
  },
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    {/* <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style> */}
    <html lang="en" className={inter.variable}>
      <body>
        <AppProviders>
          <div className="container mx-auto">{children}</div>
        </AppProviders>
      </body>
    </html>
  </>
);

export default RootLayout;
