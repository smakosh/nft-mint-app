import clsx from 'clsx';

type LoadingBlockProps = {
  className?: string;
};

const LoadingBlock = ({ className }: LoadingBlockProps) => (
  <div className="w-full animate-pulse md:w-auto">
    <div className={clsx('bg-slate-200 rounded-[20px]', className)} />
  </div>
);

export default LoadingBlock;
