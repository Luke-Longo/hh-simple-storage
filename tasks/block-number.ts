import { task } from "hardhat/config";

export default task(
  "block-number",
  "Prints the Current Block Number"
).setAction(async (taskArgs: any[], hre) => {
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log(`Block Number: ${blockNumber}`);
});
