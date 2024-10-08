import { useEffect, useRef } from "react";

type BridgeTokenModalProps = {
  setShowBridgingModal: (show: boolean) => void;
  showBridgingModal: boolean;
  txHash: string;
  setTxHash: (hash: string) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  isLoading: boolean;
  isBridging: boolean;
  quantity: string;
  toNetwork: string;
  type: string;
};

const BridgeTokenModal = (props: BridgeTokenModalProps) => {
  const {
    showBridgingModal,
    setShowBridgingModal,
    isLoading,
    txHash,
    setTxHash,
    errorMessage,
    setErrorMessage,
    quantity,
    toNetwork,
    type,
  } = props;
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (showBridgingModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!showBridgingModal && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showBridgingModal]);

  const SuccessDisplay = () => {
    if (!showBridgingModal) return null;
    return (
      <div className="card card-compact w-full max-w-xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Successful Bridging</h2>
          <p className="text-xl">
            {`Your ${quantity} ${type === "layerzero" ? "$MIN" : "$wMINT"} ${
              Number(quantity) === 1 ? "token is" : "tokens are"
            } on the way to ${toNetwork}!`}
          </p>
          <p
            className="text-clip break-words text-[10px] hover:text-accent cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(txHash);
            }}
          >
            TX: {txHash}
          </p>
          <div className="card-actions justify-end">
            <button
              onClick={() => {
                if (dialogRef.current) {
                  dialogRef.current.close();
                }
                setShowBridgingModal(false);
                setTxHash("");
              }}
              className="relative inline-flex items-center justify-center w-full px-4 py-4 text-primary-focus text-xl font-semibold transition-all duration-200 border-[1px] border-base-200 hover:opacity-80 focus:opacity-80 focus:bg-gradient-to-l from-primary to-secondary hover:text-content focus:text-success-content focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <dialog ref={dialogRef} id="my_mint_modal" className="modal">
        <form
          method="dialog"
          className="modal-box p-0 flex justify-center items-center"
        >
          {isLoading && showBridgingModal ? (
            <span className="loading loading-infinity w-[4rem] h-[4rem]"></span>
          ) : errorMessage ? (
            <p className="text-red-600 p-4">{errorMessage}</p>
          ) : (
            <SuccessDisplay />
          )}
        </form>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            if (dialogRef.current) {
              dialogRef.current.close();
            }
            setShowBridgingModal(false);
            setTxHash("");
            setErrorMessage("");
          }}
        />
      </dialog>
    </div>
  );
};

export default BridgeTokenModal;
