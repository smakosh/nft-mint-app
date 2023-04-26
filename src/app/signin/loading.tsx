import LoadingBlock from 'ui/components/LoadingBlock';

const Loading = () => (
  <div className="flex justify-center h-screen">
    <div className="self-center w-auto mx-auto text-center flex justify-between flex-col h-96">
      <div className="mb-40">
        <div className="mb-20">
          <LoadingBlock className="w-1/2 mx-auto my-6 h-48" />
          <LoadingBlock className="w-[220px] h-5 mx-auto" />
        </div>
        <div className="mb-8">
          <LoadingBlock className="mb-5 w-1/2 mx-auto my-6 h-48" />
          <LoadingBlock className="w-1/2 mx-auto my-6 h-48 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export default Loading;
