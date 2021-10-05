import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default MyApp
