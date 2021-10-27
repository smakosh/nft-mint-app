import type { AppProps } from "next/app";
import AppProviders from "utils/AppProviders";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
	<AppProviders>
		<Component {...pageProps} />
	</AppProviders>
);

export default MyApp;
