import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers } from 'ethers';
import {
  useSigner,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
  useContractRead,
  useAccount,
} from 'wagmi';
import { MetadataNFT } from 'features/unsplash/actions';
import { RootState } from 'utils/store';
import NFTFactory from '../../../../../artifacts/contracts/NFTFactory.sol/NFTFactory.json';

const MetadataForm = ({ metadata }: { metadata: MetadataNFT }) => {
  const [nftIndex, setNftIndex] = useState(0);
  const [metadataUrl, setMetadataUrl] = useState<string | undefined>(undefined);
  const [isUploadingToIPFS, setIsUploadingToIPFS] = useState(false);
  const contract = useSelector((state: RootState) => state.contract);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const { data: balance } = useContractRead({
    addressOrName: contract.address as string,
    contractInterface: NFTFactory.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
    enabled: !!address,
  });
  const { config: contractWriteConfig } = usePrepareContractWrite({
    addressOrName: contract.address as string,
    contractInterface: NFTFactory.abi,
    functionName: 'createToken',
    args: [metadataUrl],
    enabled: !!contract.address && !!metadataUrl,
  });
  const {
    data: tokenData,
    write: createToken,
    isLoading: isCreatingTokenLoading,
    isSuccess: isCreateTokenStarted,
    error: createTokenError,
  } = useContractWrite(contractWriteConfig);
  const {
    data: txData,
    isSuccess: txSuccess,
    isLoading: txLoading,
    error: txError,
  } = useWaitForTransaction({
    hash: tokenData?.hash,
    enabled: !!tokenData?.hash,
  });

  useEffect(() => {
    if (balance) {
      setNftIndex(Number(balance));
    }
  }, [balance]);

  useEffect(() => {
    if (contract.address && createToken && metadataUrl) {
      createToken({
        recklesslySetUnpreparedArgs: [metadataUrl],
      });
    }
  }, [metadataUrl, contract.address, createToken]);

  const isMinted = txSuccess;
  const isButtonDisabled = !contract.address;

  return (
    <Formik
      initialValues={{
        // @TODO: Add support to attributes, see: https://docs.opensea.io/docs/metadata-standards
        // attributes: [],
        description: metadata.description || '',
        external_url: metadata.external_url || '',
        image: metadata.image || '',
        name: metadata.name || '',
        // @TODO: Add support to attributes, see: https://docs.opensea.io/docs/metadata-standards
        // background_color: ""
      }}
      validationSchema={Yup.object().shape({
        description: Yup.string().required('Description is required'),
        external_url: Yup.string().required('External URL is required'),
        image: Yup.string().required('Image is required'),
        name: Yup.string().required('Name is required'),
      })}
      onSubmit={async (values) => {
        try {
          setIsUploadingToIPFS(true);
          const res: any = await axios.post('/api/ipfs/upload');

          const client = ipfsHttpClient({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
              authorization: res.data.auth,
            },
          });

          // upload image to IPFS
          const blob = await fetch(values.image).then((r) => r.blob());

          const image = await client.add(blob);

          // upload the rest to IPFS
          const data = JSON.stringify({
            attributes: [],
            ...values,
            image: `https://ipfs.infura.io/ipfs/${image.path}`,
          });

          // Upload to IPFS (Look up for alternatives as data is not stored forever)
          const added = await client.add(data);
          const currentMetadataUrl = `https://ipfs.infura.io/ipfs/${added.path}`;

          setMetadataUrl(currentMetadataUrl);
          setIsUploadingToIPFS(false);

          setTimeout(() => {}, 4000);

          let currentContract: ethers.Contract;

          // Mint the NFT using the deployed smart contract
          if (signer && contract.contract?.address) {
            currentContract = new ethers.Contract(contract.contract.address, NFTFactory.abi, signer);

            // Token gets created
            const transaction = await currentContract.createToken(currentMetadataUrl);
            await transaction.wait();
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {() => (
        <Form className="bg-white dark:bg-neutral-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-neutral-100 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-neutral-200 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="name"
                name="name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-neutral-100 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-neutral-200 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder="description"
                name="description"
                component="textarea"
                rows="5"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-neutral-100 text-sm font-bold mb-2"
                htmlFor="external_url"
              >
                External URL
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-neutral-200 leading-tight focus:outline-none focus:shadow-outline"
                id="external_url"
                type="text"
                placeholder="External URL"
                name="external_url"
              />
              <ErrorMessage name="external_url" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-neutral-100 text-sm font-bold mb-2" htmlFor="name">
                Image
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-neutral-200 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="text"
                placeholder="Image link"
                name="image"
              />
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
            </div>
            {createTokenError?.message && <div className="text-red-500 text-sm">{createTokenError?.message}</div>}
            {txError?.message && <div className="text-red-500 text-sm">{txError?.message}</div>}
            {isMinted && !txLoading ? (
              <div>
                <p className="text-green-500">Your NFT has been minted successfully!</p>
                <p className="mb-2">
                  View on{' '}
                  <a
                    className="underline text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      chain?.testnet
                        ? `https://${chain?.name.toLowerCase()}.etherscan.io/tx/${tokenData?.hash}`
                        : `https://etherscan.io/tx/${tokenData?.hash}`
                    }
                  >
                    Etherscan
                  </a>
                </p>
                <p>
                  View on{' '}
                  <a
                    className="underline text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      chain?.testnet
                        ? `https://testnets.opensea.io/assets/${chain?.name.toLowerCase()}/${txData?.to}/${nftIndex}`
                        : `https://opensea.io/assets/${chain?.name.toLowerCase()}/${txData?.to}/${nftIndex}`
                    }
                  >
                    Opensea
                  </a>
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isButtonDisabled && 'cursor-not-allowed opacity-50'
                  }`}
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  {isUploadingToIPFS && 'Uploading to IPFS...'}
                  {isCreatingTokenLoading && 'Waiting for approval...'}
                  {(isCreateTokenStarted || txLoading) && 'Minting...'}
                  {!isCreatingTokenLoading && !isCreateTokenStarted && !isUploadingToIPFS && !txLoading && 'Mint NFT'}
                </button>
              </div>
            )}
          </>
        </Form>
      )}
    </Formik>
  );
};

export default MetadataForm;
