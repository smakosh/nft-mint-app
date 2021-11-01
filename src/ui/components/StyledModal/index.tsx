import { FC } from "react";
import Modal from "react-modal";

const customStyles = {
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.8)",
	},
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		transform: "translate(-50%, -50%)",
		background: "none",
		border: "none",
	},
};

type SyledModalProps = {
	isOpen: boolean;
	closeModal: () => void;
};

const StyledModal: FC<SyledModalProps> = ({ isOpen, closeModal, children }) => {
	const afterOpenModal = () => {
		document.body.style.overflow = "hidden";
	};

	return (
		<Modal
			isOpen={isOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			onAfterClose={() => {
				document.body.style.overflow = "visible";
			}}
			style={customStyles}
			contentLabel="Example Modal"
			ariaHideApp={false}
		>
			{children}
		</Modal>
	);
};

export default StyledModal;
