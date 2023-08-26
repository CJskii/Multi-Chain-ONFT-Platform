export async function updateBridgeData(address: string) {
  console.log("Updating bridge data for", address);
  const response = await fetch("/api/bridge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ethereumAddress: address }),
  });
  return response;
}