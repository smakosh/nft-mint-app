import { UNSPLASH_ACCESS_KEY, UNSPLASH_REDIRECT_URI } from "config";

const Signin = () => {
	const handleLogin = () => {
		window.location.href = `https://unsplash.com/oauth/authorize?client_id=${UNSPLASH_ACCESS_KEY}&redirect_uri=${UNSPLASH_REDIRECT_URI}&response_type=code&scope=public`;
	};

	return (
		<div className="flex justify-center h-screen">
			<div className="self-center w-96 mx-auto text-center">
				<h1 className="mb-5 text-xl">Login with Unsplash to continue</h1>
				<button
					type="button"
					onClick={handleLogin}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Login with Unsplash
				</button>
			</div>
		</div>
	);
};

export default Signin;
