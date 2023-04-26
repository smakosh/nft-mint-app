import Image from 'next/image';
import type { User } from 'types';

type CardProps = {
  alt: string;
  photo: string;
  user: User;
  title?: string;
  onClick?: () => void;
};

const Card = ({ photo, user, title, alt, onClick }: CardProps) => (
  <div className="w-full h-full rounded">
    <Image
      src={photo}
      alt={alt}
      width={500}
      height={500}
      className="object-cover w-[500px] h-[500px]"
      sizes="100vw"
      priority
    />

    <div className="py-4 px-2 bg-neutral-800">
      {title && <h4 className="text-xl font-semibold">{title}</h4>}
      <p className="mt-2 italic text-xs">
        Photo by{' '}
        <a
          href={`${user.links.html}?utm_source=collection_2_nft&utm_medium=referral`}
          className="text-blue-600"
          target="_blank"
        >
          {user.name}
        </a>{' '}
        on{' '}
        <a
          href="https://unsplash.com/?utm_source=collection_2_nft&utm_medium=referral"
          className="text-blue-600"
          target="_blank"
        >
          Unsplash
        </a>
      </p>
    </div>
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
