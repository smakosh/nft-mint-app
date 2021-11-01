import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/solid";

type GoBackProps = {
	link: string;
};

const GoBack = ({ link }: GoBackProps) => (
	<div className="py-2 px-2 text-left">
		<Link href={link}>
			<a className="inline-flex justify-center items-center">
				<ChevronLeftIcon
					className="w-5 h-5 mr-1 text-purple-200 hover:text-purple-100"
					aria-hidden="true"
				/>
				Go Back
			</a>
		</Link>
	</div>
);

export default GoBack;
