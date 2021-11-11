import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collection as CollectionType, CollectionPhoto } from "types";
import { RootState } from "utils/store";
import Card from "ui/components/Card";
import StyledModal from "ui/components/StyledModal";
import {
	closeModal,
	setModal,
} from "ui/components/StyledModal/redux/modalSlice";
import { MetadataNFT } from "features/unsplash/actions";
import SmartContract from "features/unsplash/modules/SmartContract";
import SmartContractForm from "features/unsplash/modules/SmartContractForm";
import MetadataForm from "features/unsplash/modules/MetadataForm";

export type CollectionProps = {
	collection: CollectionType;
	photos: CollectionPhoto[];
};

const Collection = ({ photos, collection }: CollectionProps) => {
	const [metadata, setMetadata] = useState<MetadataNFT | null>(null);
	const modal = useSelector((state: RootState) => state.modal);
	const dispatch = useDispatch();

	const handleModal = (args: MetadataNFT) => {
		setMetadata({
			description: args.description,
			image: args.image,
			external_url: args.external_url,
			name: args.name,
		});
		dispatch(
			setModal({
				type: "metadata",
				isOpen: true,
			})
		);
	};

	const renderModal = () => {
		switch (modal.type) {
			case "contract":
				return <SmartContractForm />;
			case "metadata":
				if (metadata) return <MetadataForm metadata={metadata} />;
				return null;
			default:
				return null;
		}
	};

	return (
		<>
			<div className="py-4 flex justify-between items-center">
				<h1 className="text-4xl text-left">{collection.title}</h1>
				<SmartContract />
			</div>
			<StyledModal
				isOpen={modal.isOpen}
				closeModal={() => dispatch(closeModal())}
			>
				{renderModal()}
			</StyledModal>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-8 pt-4">
				{photos.map(({ id, urls, description }) => (
					<div key={id}>
						<Card
							photo={urls.regular}
							alt={description}
							onClick={() =>
								handleModal({
									description,
									image: urls.raw,
									external_url: urls.raw,
									name: description,
								})
							}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default Collection;
