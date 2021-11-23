import { useDispatch } from "react-redux";
import { setModal } from "ui/components/StyledModal/redux/modalSlice";
import ContractAddressInput from "features/unsplash/components/ContractAddressInput";
import { AppDispatch } from "utils/store";

const SmartContract = () => {
	const dispatch = useDispatch<AppDispatch>();

	const triggerModal = () => {
		dispatch(
			setModal({
				type: "contract",
				isOpen: true,
			})
		);
	};

	return (
		<div className="flex items-end">
			<ContractAddressInput />
			<span className="mx-3 self-center mt-5">Or</span>
			<button
				type="button"
				onClick={() => triggerModal()}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Create New ERC-721 Contract
			</button>
		</div>
	);
};

export default SmartContract;
