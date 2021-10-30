import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import AppProviders from "utils/AppProviders";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
	<AppProviders>
		<Component {...pageProps} />
		<Toaster position="top-center" reverseOrder={false} />
	</AppProviders>
);

export default MyApp;
