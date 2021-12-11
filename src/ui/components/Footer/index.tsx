import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

const Footer = () => {
  const showToast = () => {
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="text-center py-4">
      <h2 className="text-base">
        Made with love by:{' '}
        <CopyToClipboard text="0xe892089198409Fe72DAB959Abe75Fa68292Efd2B" onCopy={showToast}>
          <button
            type="button"
            className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-yellow-400"
          >
            Smakosh.eth
          </button>
        </CopyToClipboard>{' '}
        &{' '}
        <CopyToClipboard text="0xcF2B221BF02a56526357Aa48c62779372e1a4b3F" onCopy={showToast}>
          <button
            type="button"
            className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-yellow-400"
          >
            JefferyHus
          </button>
        </CopyToClipboard>
        .
      </h2>
      <p className="text-xs text-gray-700 dark:text-gray-400">(Click to copy to donate if you like this project)</p>
    </div>
  );
};

export default Footer;
