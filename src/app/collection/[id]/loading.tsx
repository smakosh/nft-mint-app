import LoadingBlock from 'ui/components/LoadingBlock';

const Loading = () => (
  <section className="pt-8 py-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {Array.from({ length: 10 }, (_, i) => 1 + i).map((item) => (
        <LoadingBlock key={`loading-collection-${item}`} className="w-full h-[584px] rounded" />
      ))}
    </div>
  </section>
);

export default Loading;
