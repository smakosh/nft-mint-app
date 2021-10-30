import { FC } from "react";
import Modal from "react-modal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

type StyledModalProps = {
	isOpen: boolean;
	setModal: (isOpen: boolean) => void;
};

const StyledModal: FC<StyledModalProps> = ({ children, isOpen, setModal }) => {
	const afterOpenModal = () => {
		document.body.style.overflow = "hidden";
	};

	return (
		<Modal
			isOpen={isOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={() => {
				setModal(false);
				document.body.style.overflow = "visible";
			}}
			style={customStyles}
			contentLabel="Example Modal"
		>
			{children}
		</Modal>
	);
};

export default StyledModal;
