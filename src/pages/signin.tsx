import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import cookie from "cookie";
import { UNSPLASH_ACCESS_KEY, UNSPLASH_REDIRECT_URI } from "config";
import { GetServerSideProps } from "next";

const Signin = () => {
	const handleLogin = () => {
		window.location.href = `https://unsplash.com/oauth/authorize?client_id=${UNSPLASH_ACCESS_KEY}&redirect_uri=${UNSPLASH_REDIRECT_URI}&response_type=code&scope=public`;
	};

	const showToast = () => {
		toast.success("Copied to clipboard!");
	};

	return (
		<div className="flex justify-center h-screen">
			<div className="self-center w-auto mx-auto text-center flex justify-between flex-col h-96">
				<div className="mb-40">
					<div className="mb-20">
						<h2 className="w-1/2 mx-auto my-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-900">
							Fetch and mint your Unsplash shots easily, then decide where to
							list them!
						</h2>
						<p className="text-sm italic text-gray-500">
							Instagram & Dribbble coming soon
						</p>
					</div>
					<div>
						<h1 className="mb-5 text-xl">Login with Unsplash to continue</h1>
						<button
							type="button"
							onClick={handleLogin}
							className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
						>
							Login with Unsplash
						</button>
					</div>
				</div>
				<div>
					<h2 className="text-base">
						Made with love by:{" "}
						<CopyToClipboard
							text="0xe892089198409Fe72DAB959Abe75Fa68292Efd2B"
							onCopy={showToast}
						>
							<button type="button" className="font-bold">
								Smakosh.eth
							</button>
						</CopyToClipboard>{" "}
						&{" "}
						<CopyToClipboard
							text="0xcF2B221BF02a56526357Aa48c62779372e1a4b3F"
							onCopy={showToast}
						>
							<button type="button" className="font-bold">
								JefferyHus
							</button>
						</CopyToClipboard>
						.
					</h2>
					<p className="text-xs text-gray-700">
						(Click to copy to donate if you like this project)
					</p>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	ctx
): Promise<any> => {
	const cookies = cookie.parse(ctx.req.headers.cookie || "");

	if (cookies.access_token) {
		const accessToken = cookies.access_token;

		if (accessToken) {
			return {
				redirect: {
					destination: "/",
				},
			};
		}

		return {
			props: {},
		};
	}

	return {
		props: {},
	};
};

export default Signin;
