import { Toaster } from 'react-hot-toast';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import nextSEOConfig from 'config/next-seo.config';
import AppProviders from 'utils/AppProviders';
import 'tailwindcss/tailwind.css';
import NextNProgress from 'nextjs-progressbar';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppProviders>
    <DefaultSeo {...nextSEOConfig} />
    <NextNProgress />
    <Component {...pageProps} />
    <Toaster position="top-center" reverseOrder={false} />
  </AppProviders>
);

export default MyApp;
