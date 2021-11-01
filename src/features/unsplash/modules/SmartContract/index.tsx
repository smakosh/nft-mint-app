import { useDispatch } from "react-redux";
import { setModal } from "ui/components/StyledModal/redux/modalSlice";
import ContractAddressInput from "features/unsplash/components/ContractAddressInput";

const SmartContract = () => {
	const dispatch = useDispatch();

	const triggerModal = () => {
		dispatch(
			setModal({
				type: "contract",
				isOpen: true,
			})
		);
	};

	return (
		<div>
			<ContractAddressInput />
			<button
				type="button"
				onClick={() => triggerModal()}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				New contract
			</button>
		</div>
	);
};

export default SmartContract;
