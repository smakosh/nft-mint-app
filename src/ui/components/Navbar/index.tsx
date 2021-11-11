import { Fragment } from "react";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { Menu, Transition } from "@headlessui/react";
import {
	ChevronDownIcon,
	ClipboardCopyIcon,
	CurrencyDollarIcon,
	GlobeAltIcon,
} from "@heroicons/react/solid";
import { UserData } from "features/user/redux/userSlice";

type NavbarProps = Pick<
	UserData,
	"address" | "balance" | "network" | "shortAddress" | "symbol" | "ethENS"
> & {
	signIn: () => void;
};

const Navbar = ({
	address,
	shortAddress,
	balance,
	network,
	signIn,
	symbol,
	ethENS,
}: NavbarProps) => (
	<div className="py-4 text-right">
		{address ? (
			<Menu as="div" className="relative inline-block text-right">
				<div>
					<Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-800 rounded-md bg-opacity-90 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						{ethENS || shortAddress}
						<ChevronDownIcon
							className="w-5 h-5 ml-2 -mr-1 text-purple-200 hover:text-purple-100"
							aria-hidden="true"
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="z-10 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1">
							<Menu.Item>
								{({ active }) => (
									<CopyToClipboard
										text={address}
										onCopy={() => toast.success("Copied to clipboard!")}
									>
										<button
											type="button"
											className={`${
												active ? "bg-purple-500 text-white" : "text-gray-900"
											} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
										>
											{active ? (
												<ClipboardCopyIcon
													className="w-5 h-5 mr-2"
													aria-hidden="true"
												/>
											) : (
												<ClipboardCopyIcon
													className="w-5 h-5 mr-2"
													aria-hidden="true"
												/>
											)}
											Copy address
										</button>
									</CopyToClipboard>
								)}
							</Menu.Item>
							{balance && (
								<Menu.Item>
									{({ active }) => (
										<button
											type="button"
											className={`${
												active ? "bg-purple-500 text-white" : "text-gray-900"
											} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
										>
											{active ? (
												<CurrencyDollarIcon
													className="w-5 h-5 mr-2"
													aria-hidden="true"
												/>
											) : (
												<CurrencyDollarIcon
													className="w-5 h-5 mr-2"
													aria-hidden="true"
												/>
											)}
											Balance: {balance} {symbol}
										</button>
									)}
								</Menu.Item>
							)}
							<Menu.Item>
								{({ active }) => (
									<button
										type="button"
										className={`${
											active ? "bg-purple-500 text-white" : "text-gray-900"
										} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
									>
										{active ? (
											<GlobeAltIcon
												className="w-5 h-5 mr-2"
												aria-hidden="true"
											/>
										) : (
											<GlobeAltIcon
												className="w-5 h-5 mr-2"
												aria-hidden="true"
											/>
										)}
										Network: {network}
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		) : (
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				type="button"
				onClick={signIn}
			>
				Sign In with Metamask
			</button>
		)}
	</div>
);

export default Navbar;
