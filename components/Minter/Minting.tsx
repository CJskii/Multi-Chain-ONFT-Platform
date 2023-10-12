import { useEffect, useState } from "react";
import CustomButtonMint from "../Buttons/CustomButtonMint";
import CustomButtonNetwork from "../Buttons/CustomButtonNetwork";
import { activeChains } from "../../constants/chainsConfig";
import { useNetwork } from "wagmi";
import { checkIfReferredUser } from "../../utils/helpers/checkIfReferredUser";
import { useNetworkSelection } from "../../utils/hooks/useNetworkSelection";
import NetworkModal from "../Modals/NetworkModal";
import dynamic from "next/dynamic";

const CardImage = dynamic(() => import("./CardImage"), {
  loading: () => (
    <span className="loading loading-spinner place-self-center "></span>
  ),
  ssr: false,
});

const Minting = () => {
  const [lastMintId, setLastMintId] = useState(0);

  const [isInvited, setIsInvited] = useState(false);
  const [referredBy, setReferredBy] = useState("");
  const { chain } = useNetwork();

  const {
    selectedNetwork: mintNetwork,
    onNetworkSelect: setMintNetwork,
    searchTerm: fromSearchTerm,
    onSearchChange: setFromSearchTerm,
    filteredChains: fromFilteredChains,
    onClose: onFromClose,
  } = useNetworkSelection(activeChains[0]);

  useEffect(() => {
    let selected = mintNetwork;

    if (chain?.name && !chain.unsupported) {
      const networkObject = activeChains.find((net) => net.name === chain.name);
      selected = networkObject || activeChains[0];
    }
    const isReferredUser = checkIfReferredUser();
    const { isReferred, refLink } = isReferredUser;
    setIsInvited(isReferred);
    setReferredBy(refLink ? refLink : "");
    setMintNetwork(selected);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.name]);

  return (
    <div className="flex flex-col justify-betweeen items-center min-w-full">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-base">
          <CardImage />
          {/* Mint Form */}
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
            <div className="md:w-full xl:max-w-lg 2xl:max-w-xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between ">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl text-content-focus">
                Step 1: Mint ONFT
              </h2>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-natural-content"
                  >
                    {" "}
                    Select Chain{" "}
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <NetworkModal
                      selectedNetwork={mintNetwork}
                      onNetworkSelect={setMintNetwork}
                      searchTerm={fromSearchTerm}
                      onSearchChange={setFromSearchTerm}
                      filteredChains={fromFilteredChains}
                      onClose={onFromClose}
                      dialogId="mintNetworkModal"
                      title="Mint"
                    />
                  </div>
                </div>

                <div>
                  <CustomButtonNetwork mintNetwork={mintNetwork.name} />
                </div>
              </div>

              <div className="mt-3 space-y-3">
                <CustomButtonMint
                  setLastMintId={setLastMintId}
                  mintNetwork={mintNetwork.name}
                  isInvited={isInvited}
                  referredBy={referredBy}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Minting;
