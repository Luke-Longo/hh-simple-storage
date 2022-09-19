import { ethers, run, network } from "hardhat";

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying SimpleStorage...");

  const simpleStorage = await SimpleStorageFactory.deploy();

  await simpleStorage.deployed();

  console.log("SimpleStorage deployed to:", simpleStorage.address);
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);

    await verify(simpleStorage.address, []);
  } else {
    console.log("Skipping verification");
  }

  const currentValue = await simpleStorage.retrieve();

  console.log("Current value: ", currentValue.toString());

  console.log("Setting value to 5...");

  const setValueTx = await simpleStorage.store(5);

  await setValueTx.wait();

  const newValue = await simpleStorage.retrieve();

  console.log("New value: ", newValue.toString());
}

async function verify(contractAddress: string, args: any[]) {
  console.log("Verifying contract on Etherscan...");
  try {
    const res = await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });

    console.log("Contract verified!");
  } catch (error: any) {
    console.error(error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
