import Image from "next/image";

type CardProps = {
	alt: string;
	photo: string;
	title?: string;
	onClick?: () => void;
};

const Card = ({ photo, title, alt, onClick }: CardProps) => (
	<div className="w-full h-full">
		<div>
			<Image
				src={photo}
				alt={alt}
				width={500}
				height={500}
				layout="responsive"
				objectFit="cover"
				priority={true}
			/>
		</div>
		{title && (
			<div>
				<h4>{title}</h4>
			</div>
		)}
		{onClick && (
			<div>
				<button
					onClick={onClick}
					type="button"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
				>
					Edit Metadata
				</button>
			</div>
		)}
	</div>
);

export default Card;
