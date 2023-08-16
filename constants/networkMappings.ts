// TODO: Figure out why Mantle and zkEVM are not working
// TODO: test Metis and Mantle from the backend calls

export const networkTransferMappings: { [key: string]: string[] } = {
  "Polygon zkEVM Testnet": [
    "Goerli",
    // "Sepolia",
    "Arbitrum Goerli",
    "Optimism Goerli",
    "Base Goerli",
    "Linea Goerli Testnet",
    "Binance Smart Chain Testnet",
    "Polygon Mumbai",
    // "Mantle Testnet",
    "Metis Goerli",
  ],
  Sepolia: [
    "Goerli",
    "Arbitrum Goerli",
    "Optimism Goerli",
    "Base Goerli",
    "Linea Goerli Testnet",
    "Binance Smart Chain Testnet",
    // "Polygon zkEVM Testnet",
    "Polygon Mumbai",
    // "Mantle Testnet",
    "Metis Goerli",
  ],
  Goerli: [
    "Sepolia",
    "Arbitrum Goerli",
    "Optimism Goerli",
    "Base Goerli",
    "Linea Goerli Testnet",
    "Binance Smart Chain Testnet",
    "Polygon zkEVM Testnet",
    "Polygon Mumbai",
    "Mantle Testnet",
    "Metis Goerli",
  ],
  "Arbitrum Goerli": [
    "Goerli",
    "Sepolia",
    "Optimism Goerli",
    "Base Goerli",
    "Linea Goerli Testnet",
    "Binance Smart Chain Testnet",
    // "Polygon zkEVM Testnet",
    "Polygon Mumbai",
    // "Mantle Testnet",
    "Metis Goerli",
  ],
  "Optimism Goerli": [
    "Goerli",
    "Sepolia",
    "Arbitrum Goerli",
    "Base Goerli",
    "Linea Goerli Testnet",
    "Binance Smart Chain Testnet",
    // "Polygon zkEVM Testnet",
    "Polygon Mumbai",
    // "Mantle Testnet",
    "Metis Goerli",
  ],
  "Base Goerli": [
    "Goerli",
    "Sepolia",
    "Arbitrum Goerli",
    "Optimism Goerli",
    "Linea Goerli Testnet",
    "Binance Smart Chain Testnet",
    // "Polygon zkEVM Testnet",
    "Polygon Mumbai",
    // "Mantle Testnet",
    "Metis Goerli",
  ],
  "Linea Goerli Testnet": [
    "Goerli",
    "Sepolia",
    "Arbitrum Goerli",
    "Optimism Goerli",
    "Base Goerli",
    "Binance Smart Chain Testnet",
    // "Polygon zkEVM Testnet",
    "Polygon Mumbai",
    // "Mantle Testnet",
    "Metis Goerli",
  ],
  "Binance Smart Chain Testnet": [
    "Goerli",
    "Sepolia",
    "Arbitrum Goerli",
    "Optimism Goerli",
    "Base Goerli",
    "Linea Goerli Testnet",
    // "Polygon zkEVM Testnet",
    "Polygon Mumbai",
    // "Mantle Testnet",
    "Metis Goerli",
  ],
  "Polygon Mumbai": [
    "Goerli",
    "Sepolia",
    "Arbitrum Goerli",
    "Optimism Goerli",
    "Base Goerli",
    "Linea Goerli Testnet",
    "Binance Smart Chain Testnet",
    // "Polygon zkEVM Testnet",
    // "Mantle Testnet",
    "Metis Goerli",
  ],
  "Mantle Testnet": [
    "Goerli",
    "Sepolia",
    "Arbitrum Goerli",
    "Optimism Goerli",
    "Base Goerli",
    "Linea Goerli Testnet",
    "Binance Smart Chain Testnet",
    "Polygon zkEVM Testnet",
    "Polygon Mumbai",
    "Metis Goerli",
  ],
  "Metis Goerli": [
    "Goerli",
    "Sepolia",
    "Arbitrum Goerli",
    "Optimism Goerli",
    "Base Goerli",
    "Linea Goerli Testnet",
    "Binance Smart Chain Testnet",
    "Polygon zkEVM Testnet",
    "Polygon Mumbai",
    "Mantle Testnet",
  ],
  Base: [
    "Linea",
    "OP Mainnet",
    "Arbitrum One",
    "BNB Smart Chain",
    "Polygon",
    "Polygon zkEVM",
    "Mantle",
    "Metis",
    // "Core Dao",
  ],
  "OP Mainnet": [
    "Base",
    "Linea",
    "Arbitrum One",
    "BNB Smart Chain",
    "Polygon",
    "Polygon zkEVM",
    "Mantle",
    "Metis",
    "Core Dao",
  ],
  "Arbitrum One": [
    "Base",
    "Linea",
    "OP Mainnet",
    "BNB Smart Chain",
    "Polygon",
    "Polygon zkEVM",
    "Mantle",
    "Metis",
    "Core Dao",
  ],
  "BNB Smart Chain": [
    "Base",
    "Linea",
    "OP Mainnet",
    "Arbitrum One",
    "Polygon",
    "Polygon zkEVM",
    "Mantle",
    "Metis",
    "Core Dao",
  ],
  Polygon: [
    "Base",
    "Linea",
    "OP Mainnet",
    "Arbitrum One",
    "BNB Smart Chain",
    "Polygon zkEVM",
    "Mantle",
    "Metis",
    "Core Dao",
  ],
  "Polygon zkEVM": [
    "Base",
    "Linea",
    "OP Mainnet",
    "Arbitrum One",
    "BNB Smart Chain",
    "Polygon",
    "Mantle",
    "Metis",
    // "Core Dao",
  ],
  Mantle: [
    "Base",
    "Linea",
    "OP Mainnet",
    "Arbitrum One",
    "BNB Smart Chain",
    "Polygon",
    "Polygon zkEVM",
    "Metis",
    "Core Dao",
  ],
  Metis: [
    "Base",
    "Linea",
    "OP Mainnet",
    "Arbitrum One",
    "BNB Smart Chain",
    "Polygon",
    "Polygon zkEVM",
    "Mantle",
    "Core Dao",
  ],
  Linea: [
    "Base",
    "OP Mainnet",
    "Arbitrum One",
    "BNB Smart Chain",
    "Polygon",
    "Polygon zkEVM",
    "Mantle",
    "Metis",
    "Core Dao",
  ],
  "Core Dao": [
    "Base",
    "Linea",
    "OP Mainnet",
    "Arbitrum One",
    "BNB Smart Chain",
    "Polygon",
    "Polygon zkEVM",
    "Mantle",
    "Metis",
  ],
};
