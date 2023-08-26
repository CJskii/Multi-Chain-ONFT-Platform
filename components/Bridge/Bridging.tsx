import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../../constants/contractABI";
import { getContractAddress } from "../../utils/getConstants";
import { getRemoteChainId } from "../../utils/getConstants";
import { useNetwork, useAccount } from "wagmi";
import CustomButtonNetwork from "../CustomButtonNetwork";
import CustomButtonBridge from "./CustomButtonBridge";
import SelectBridgeFromModal from "./SelectBridgeFromModal";
import SelectBridgeToModal from "./SelectBridgeToModal";
import BridgingModal from "./BridgingModal";
import getProviderOrSigner from "../../utils/getProviderOrSigner";
import { updateBridgeData } from "../../utils/api/bridgeAPI";

interface BridgeProps {
  passedNftId: string;
  mintNetwork: string;
  onBridgeComplete: () => void;
}

const Bridging = (props: BridgeProps) => {
  let { passedNftId, mintNetwork, onBridgeComplete } = props;
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const [fromNetwork, setFromNetwork] = useState(mintNetwork || "Goerli");
  const [toNetwork, setToNetwork] = useState("");
  const [nftId, setNftId] = useState(passedNftId || "");
  const [showBridgingModal, setShowBridgingModal] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (passedNftId) setNftId(passedNftId);
    if (mintNetwork) setFromNetwork(mintNetwork);
    if (!mintNetwork || (chain?.name && !chain.unsupported)) {
      setFromNetwork(chain?.name || "Goerli");
    }
    checkNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedNftId, mintNetwork, chain?.name, chain?.unsupported]);

  useEffect(() => {
    checkNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromNetwork, toNetwork, chain?.name, chain?.unsupported]);

  const checkNetwork = () => {
    if (chain?.name == fromNetwork) {
      setWrongNetwork(false);
    } else {
      setWrongNetwork(true);
    }
  };

  const handleBridge = async () => {
    const TOKEN_ID = nftId;
    const CONTRACT_ADDRESS = getContractAddress(fromNetwork);
    let targetNetwork = toNetwork.toLowerCase();
    if (!nftId || nftId === "") {
      alert("Please enter a valid NFT Id");
      return;
    }

    try {
      setIsLoading(true);
      setShowBridgingModal(true);
      const signer = await getProviderOrSigner(true);
      const ownerAddress = await (signer as JsonRpcSigner).getAddress();

      // REMOTE CHAIN ID IS THE CHAIN OF THE RECEIVING NETWORK
      // ex. if you are sending from Ethereum to Polygon, the remote chain id is the Polygon chain id

      const remoteChainId = getRemoteChainId(targetNetwork);

      console.log(
        `Sending NFT #${TOKEN_ID} from ${fromNetwork} to ${toNetwork}`
      );

      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const adapterParams = ethers.utils.solidityPack(
        ["uint16", "uint256"],
        [1, 200000]
      );
      // console.log(`adapterParams: ${adapterParams}`);
      // console.log(`remoteChainId: ${remoteChainId}`);
      // console.log(`ownerAddress: ${ownerAddress}`);
      // console.log(`TOKEN_ID: ${TOKEN_ID}`);
      // console.log(`remoteChainId: ${remoteChainId}`);
      const fees = await contract.estimateSendFee(
        remoteChainId,
        ownerAddress,
        TOKEN_ID,
        false,
        adapterParams
      );

      console.log(`fees: ${fees}`);

      const nativeFee = fees[0];
      console.log(`native fees (wei): ${nativeFee}`);

      const tx = await contract.sendFrom(
        ownerAddress, // 'from' address to send tokens
        remoteChainId, // remote LayerZero chainId
        ownerAddress, // 'to' address to send tokens
        TOKEN_ID, // tokenId to send
        ownerAddress, // refund address (if too much message fee is sent, it gets refunded)
        ethers.constants.AddressZero, // address(0x0) if not paying in ZRO (LayerZero Token)
        adapterParams, // flexible bytes array to indicate messaging adapter services
        { value: nativeFee.mul(5).div(4) }
      );

      await tx.wait();
      console.log("NFT sent!");
      if (address)
        updateBridgeData(address).then((response) => {
          if (response.status === 200) {
            console.log("Bridge data updated");
          } else {
            console.log("Bridge data update failed");
            console.log(response);
          }
        });
      setNftId("");
      setIsLoading(false);
      setTxHash(tx.hash);
      onBridgeComplete();
    } catch (e) {
      console.error(e);
      setIsLoading(false);

      const dataMessage = (e as any).data?.message;
      const genericMessage = (e as any)?.message;

      if (dataMessage) {
        if (dataMessage.includes("insufficient funds")) {
          return setErrorMessage(
            "You have insufficient funds to complete this transaction."
          );
        } else if (dataMessage.includes("ERC721: invalid token ID")) {
          return setErrorMessage(
            "Invalid ERC721 token ID provided. Please check and try again."
          );
        } else if (dataMessage.includes("execution reverted")) {
          return setErrorMessage(
            "Transaction execution was reverted. Please check the transaction details."
          );
        } else {
          return setErrorMessage(dataMessage);
        }
      } else if (genericMessage) {
        if (genericMessage.includes("insufficient funds")) {
          return setErrorMessage(
            "You have insufficient funds to complete this transaction."
          );
        } else if (genericMessage.includes("ERC721: invalid token ID")) {
          return setErrorMessage(
            "Invalid ERC721 token ID provided. Please check and try again."
          );
        } else if (genericMessage.includes("execution reverted")) {
          return setErrorMessage(
            "Transaction execution was reverted. Please check the transaction details."
          );
        } else {
          return setErrorMessage("An error occurred");
        }
      } else {
        return setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-between items-center min-w-full">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none bg">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
          <div className="md:w-full xl:max-w-lg 2xl:max-w-xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between lg:p-8">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl text-content-focus">
              Step 2: Bridge ONFT
            </h2>

            <div className="space-y-5">
              {/* Select From Network */}
              <BridgingModal
                showBridgingModal={showBridgingModal}
                isLoading={isLoading}
                setShowBridgingModal={setShowBridgingModal}
                txHash={txHash}
                setTxHash={setTxHash}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
              <div className="my-8">
                <CustomButtonNetwork mintNetwork={fromNetwork} />
              </div>

              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-natural-content"
                >
                  Bridge From
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <SelectBridgeFromModal
                    setFromNetwork={setFromNetwork}
                    mintNetwork={mintNetwork}
                  />
                </div>
              </div>

              {/* Select To Network */}
              {chain?.name && !chain.unsupported ? (
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-natural-content"
                  >
                    Bridge To
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <SelectBridgeToModal
                      setToNetwork={setToNetwork}
                      fromNetwork={fromNetwork}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}

              {/* Input NFT ID */}
              <div className="mt-2.5">
                <label
                  htmlFor="nftId"
                  className="text-base font-medium text-natural-content"
                >
                  NFT ID
                </label>
                <input
                  type="number"
                  id="nftId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={passedNftId !== "" ? passedNftId : nftId || ""}
                  onChange={(e) => setNftId(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-3 space-y-3">
              <CustomButtonBridge
                isLoading={isLoading}
                wrongNetwork={wrongNetwork}
                nftId={nftId}
                handleBridge={handleBridge}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bridging;
