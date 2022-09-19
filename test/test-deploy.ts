import { ethers } from "hardhat";
import { expect, assert } from "chai";

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should star with a favorite number of 0", async function () {
    const favoriteNumber = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(favoriteNumber.toString(), expectedValue);
  });

  it("Should update the value to the new value when calling store function", async function () {
    const currentValue = await simpleStorage.retrieve();

    console.log("currentValue", currentValue.toString());

    const newValue = "5";

    simpleStorage.store(newValue);

    const favoriteNumber = await simpleStorage.retrieve();

    assert.equal(favoriteNumber.toString(), newValue);
  });
});
