import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import cookie from "cookie";
import { ethers } from "ethers";
import { Flex, Item } from "react-flex-ready";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Collection, Profile } from "types";
import NFTFactory from "../artifacts/contracts/NFTFactory.sol/NFTFactory.json";

type IndexProps = {
	collections: Collection[];
	profile: Profile;
};

const Index = ({ collections, profile }: IndexProps) => {
	const [userAddress, setUserAddress] = useState<string | null>(null);

	const client = ipfsHttpClient({
		url: "https://ipfs.infura.io:5001/api/v0",
	});

	const requestAccount = async () => {
		if ((window as any).ethereum) {
			const provider = new ethers.providers.Web3Provider(
				(window as any).ethereum,
				"any"
			);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			setUserAddress(address);
		} else {
			alert("Please Install MetaMask");
		}
	};

	useEffect(() => {
		if (!userAddress) {
			requestAccount();
		}
	}, [userAddress]);

	// const metadata = {
	// 	attributes: [],
	// 	description: "Marrakech, Morocco",
	// 	external_url: "https://example.com/?token_id=1",
	// 	image:
	// 		"https://images.unsplash.com/photo-1563976983419-ab0c5789460b?ixlib=rb-1.2.1",
	// 	name: "Marrakech",
	// };

	// call the smart contract, send an update
	const createNFT = async () => {
		if (typeof (window as any).ethereum !== "undefined" && userAddress) {
			const provider = new ethers.providers.Web3Provider(
				(window as any).ethereum
			);
			const signer = provider.getSigner();

			const factory = new ethers.ContractFactory(
				NFTFactory.abi,
				NFTFactory.bytecode,
				signer
			);

			const deployedContract = await factory.deploy("TESTContract", "TST");

			await deployedContract.deployed();

			const data = JSON.stringify({
				attributes: [],
				description: "Rabat, Morocco",
				external_url: "https://example.com/?token_id=1",
				image:
					"https://images.unsplash.com/photo-1494797032936-319bfccccbe0?ixlib=rb-1.2.1",
				name: "Rabat",
			});
			const added = await client.add(data);
			const url = `https://ipfs.infura.io/ipfs/${added.path}`;

			const contract = new ethers.Contract(
				deployedContract.address,
				NFTFactory.abi,
				signer
			);
			const transaction = await contract.createToken(url);
			await transaction.wait();
		}
	};

	return (
		<div>
			<div className="text-center py-4">
				{userAddress ? (
					<div>
						<h1>
							Your address: <span className="font-bold">{userAddress}</span>
						</h1>
						<button
							type="button"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={createNFT}
						>
							Mint NFT
						</button>
					</div>
				) : (
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						type="button"
						onClick={requestAccount}
					>
						Sign in with Metamask
					</button>
				)}
			</div>
			<section className="pt-8 px-4">
				<Flex col={3} colTablet={6} colMobile={12} gap={2} align="flex-start">
					{collections.map(({ id, title, cover_photo }) => (
						<Item
							col={3}
							colTablet={6}
							colMobile={12}
							gap={2}
							marginBottom={20}
							stretch
							key={id}
						>
							<div className="w-full h-full">
								<div>
									<Image
										src={cover_photo.urls.regular}
										alt={title}
										width={cover_photo.width}
										height={cover_photo.height}
										layout="responsive"
									/>
								</div>
								<div>
									<h4>{title}</h4>
								</div>
							</div>
						</Item>
					))}
				</Flex>
			</section>
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
			const headers = {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};

			const meResponse = await fetch("https://api.unsplash.com/me", headers);
			const me = await meResponse.json();

			const response = await fetch(
				`https://api.unsplash.com/users/${me.username}/collections?page=1`,
				headers
			);
			const collections = await response.json();

			return {
				props: {
					collections,
					profile: me,
				},
			};
		} else {
			return {
				redirect: {
					destination: "/signin",
				},
			};
		}
	}

	return {
		redirect: {
			destination: "/signin",
		},
	};
};

export default Index;
