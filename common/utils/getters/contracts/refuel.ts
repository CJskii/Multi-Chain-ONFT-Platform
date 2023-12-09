export const getRefuelEnvVarName = (
  fromNetwork: string
): string | undefined => {
  switch (fromNetwork) {
    case "ZKEVM":
      return process.env.NEXT_PUBLIC_ZKEVM_REFUEL_CONTRACT;
    case "OPTIMISM":
      return process.env.NEXT_PUBLIC_OPTIMISM_REFUEL_CONTRACT;
    case "ARBITRUM":
      return process.env.NEXT_PUBLIC_ARBITRUM_REFUEL_CONTRACT;
    case "BSC":
      return process.env.NEXT_PUBLIC_BSC_REFUEL_CONTRACT;
    case "POLYGON":
      return process.env.NEXT_PUBLIC_POLYGON_REFUEL_CONTRACT;
    case "BASE":
      return process.env.NEXT_PUBLIC_BASE_REFUEL_CONTRACT;
    case "LINEA":
      return process.env.NEXT_PUBLIC_LINEA_REFUEL_CONTRACT;
    case "METIS":
      return process.env.NEXT_PUBLIC_METIS_REFUEL_CONTRACT;
    case "COREDAO":
      return process.env.NEXT_PUBLIC_COREDAO_REFUEL_CONTRACT;
    case "MANTLE":
      return process.env.NEXT_PUBLIC_MANTLE_REFUEL_CONTRACT;
    case "AVALANCHE":
      return process.env.NEXT_PUBLIC_AVALANCHE_REFUEL_CONTRACT;
    case "FANTOM":
      return process.env.NEXT_PUBLIC_FANTOM_REFUEL_CONTRACT;
    case "CELO":
      return process.env.NEXT_PUBLIC_CELO_REFUEL_CONTRACT;
    case "MOONBEAM":
      return process.env.NEXT_PUBLIC_MOONBEAM_REFUEL_CONTRACT;
    case "MOONRIVER":
      return process.env.NEXT_PUBLIC_MOONRIVER_REFUEL_CONTRACT;
    case "ZORA":
      return process.env.NEXT_PUBLIC_ZORA_REFUEL_CONTRACT;
    case "CANTO":
      return process.env.NEXT_PUBLIC_CANTO_REFUEL_CONTRACT;
    case "HARMONY":
      return process.env.NEXT_PUBLIC_HARMONY_REFUEL_CONTRACT;
    case "ZKSYNC":
      return process.env.NEXT_PUBLIC_ZKSYNC_REFUEL_CONTRACT;
    case "OPBNB":
      return process.env.NEXT_PUBLIC_OPBNB_REFUEL_CONTRACT;
    case "SCROLL":
      return process.env.NEXT_PUBLIC_SCROLL_REFUEL_CONTRACT;
    case "FUSE":
      return process.env.NEXT_PUBLIC_FUSE_REFUEL_CONTRACT;
    case "TENET":
      return process.env.NEXT_PUBLIC_TENET_REFUEL_CONTRACT;
    case "METER":
      return process.env.NEXT_PUBLIC_METER_REFUEL_CONTRACT;
    case "KLAYTN":
      return process.env.NEXT_PUBLIC_KLAYTN_REFUEL_CONTRACT;
    case "ARBITRUM-NOVA":
      return process.env.NEXT_PUBLIC_ARBITRUM_NOVA_REFUEL_CONTRACT;
    case "ASTAR":
      return process.env.NEXT_PUBLIC_ASTAR_REFUEL_CONTRACT;
    case "KAVA":
      return process.env.NEXT_PUBLIC_KAVA_REFUEL_CONTRACT;
    case "AURORA":
      return process.env.NEXT_PUBLIC_AURORA_REFUEL_CONTRACT;
    case "MANTA":
      return process.env.NEXT_PUBLIC_MANTA_REFUEL_CONTRACT;
    case "PGN":
      return process.env.NEXT_PUBLIC_PGN_REFUEL_CONTRACT;
    default:
      return undefined;
  }
};