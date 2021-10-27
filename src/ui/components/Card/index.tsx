import Image from "next/image";

type CardProps = {
	alt: string;
	photo: string;
	title?: string;
};

const Card = ({ photo, title, alt }: CardProps) => (
	<div className="w-full h-full">
		<div>
			<Image
				src={photo}
				alt={alt}
				width={500}
				height={500}
				layout="responsive"
				objectFit="cover"
			/>
		</div>
		{title && (
			<div>
				<h4>{title}</h4>
			</div>
		)}
	</div>
);

export default Card;
