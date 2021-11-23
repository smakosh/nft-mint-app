import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createNFT, MetadataNFT } from "features/unsplash/actions";
import { AppDispatch, RootState } from "utils/store";

const MetadataForm = ({ metadata }: { metadata: MetadataNFT }) => {
	const dispatch = useDispatch<AppDispatch>();
	const contract = useSelector((state: RootState) => state.contract);
	const user = useSelector((state: RootState) => state.user);

	const isButtonDisabled = !contract.address && !contract.contract;

	return (
		<Formik
			initialValues={{
				// @TODO: Add support to attributes, see: https://docs.opensea.io/docs/metadata-standards
				// attributes: [],
				description: metadata.description || "",
				external_url: metadata.external_url || "",
				image: metadata.image || "",
				name: metadata.name || "",
				// @TODO: Add support to attributes, see: https://docs.opensea.io/docs/metadata-standards
				// background_color: ""
			}}
			validationSchema={Yup.object().shape({
				description: Yup.string().required("Description is required"),
				external_url: Yup.string().required("External URL is required"),
				image: Yup.string().required("Image is required"),
				name: Yup.string().required("Name is required"),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					setSubmitting(true);
					await createNFT(user, contract, values, dispatch);
				} catch (error) {
					console.log(error);
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="name"
						>
							Name
						</label>
						<Field
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							placeholder="name"
							name="name"
						/>
						<ErrorMessage
							name="name"
							component="div"
							className="text-red-500 text-sm"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="description"
						>
							Description
						</label>
						<Field
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="description"
							type="text"
							placeholder="description"
							name="description"
							component="textarea"
							rows="5"
						/>
						<ErrorMessage
							name="description"
							component="div"
							className="text-red-500 text-sm"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="external_url"
						>
							External URL
						</label>
						<Field
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="external_url"
							type="text"
							placeholder="External URL"
							name="external_url"
						/>
						<ErrorMessage
							name="external_url"
							component="div"
							className="text-red-500 text-sm"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="name"
						>
							Image
						</label>
						<Field
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="image"
							type="text"
							placeholder="Image link"
							name="image"
						/>
						<ErrorMessage
							name="image"
							component="div"
							className="text-red-500 text-sm"
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
								isButtonDisabled && "cursor-not-allowed opacity-50"
							}`}
							type="submit"
							disabled={isButtonDisabled}
						>
							{isSubmitting && contract.nftStatus !== null
								? contract.nftStatus
								: "Mint NFT"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default MetadataForm;
