// SPDX-License-Identifier: Apache-2.0


// Copyright 2023 Stichting Block Foundation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "@ethersproject/contracts";

/**
 * @file Testing the IFCDataContract.sol contract
 */

describe("IFCDataContract", function() {
  let ifcDataContract: Contract;

  /**
   * @dev Before each test a new contract instance is deployed
   */
  beforeEach(async function() {
    const IFCDataContract = await ethers.getContractFactory("IFCDataContract");
    const [owner, addr1] = await ethers.getSigners();

    // Deploy the contract
    ifcDataContract = await IFCDataContract.deploy(owner.address);
    await ifcDataContract.deployed();
  });

  /**
   * @dev Testing the requestIFCData function
   */
  describe("requestIFCData", function() {
    it("Should emit ReceivedNewRequestId event when data is requested", async function() {
      await expect(ifcDataContract.requestIFCData()).to.emit(ifcDataContract, "ReceivedNewRequestId");
    });

    it("Should revert if not called by the owner", async function() {
      const [_, addr1] = await ethers.getSigners();
      await expect(ifcDataContract.connect(addr1).requestIFCData()).to.be.revertedWith("Caller is not owner");
    });
  });

  /**
   * @dev Testing the fulfillIFCData function
   */
  describe("fulfillIFCData", function() {
    it("Should emit IFCDataUpdated event when data is fulfilled", async function() {
      const [_, addr1] = await ethers.getSigners();
      const requestId = ethers.utils.keccak256("0x");
      await expect(ifcDataContract.fulfillIFCData(requestId, "Test Building", 100, 1000, 10000)).to.emit(ifcDataContract, "IFCDataUpdated");
    });

    it("Should revert if not called by the oracle", async function() {
      const [_, addr1] = await ethers.getSigners();
      const requestId = ethers.utils.keccak256("0x");
      await expect(ifcDataContract.connect(addr1).fulfillIFCData(requestId, "Test Building", 100, 1000, 10000)).to.be.revertedWith("Caller is not the oracle");
    });
  });

  /**
   * @dev Testing the getIFCData function
   */
  describe("getIFCData", function() {
    it("Should return correct IFCData when called with a valid request ID", async function() {
      const [_, addr1] = await ethers.getSigners();
      const requestId = ethers.utils.keccak256("0x");

      // First, fulfill the data
      await ifcDataContract.fulfillIFCData(requestId, "Test Building", 100, 1000, 10000);

      // Now, retrieve it
      const ifcData = await ifcDataContract.getIFCData(requestId);

      // Assert that the data is correct
      expect(ifcData.buildingName).to.equal("Test Building");
      expect(ifcData.buildingHeight).to.equal(100);
      expect(ifcData.buildingArea).to.equal(1000);
      expect(ifcData.buildingVolume).to.equal(10000);
    });

    it("Should return zero values for nonexistent request IDs", async function() {
      const requestId = ethers.utils.keccak256("0x1");

      // Attempt to retrieve data for an ID that doesn't exist
      const ifcData = await ifcDataContract.getIFCData(requestId);

      // Assert that the data is zero
      expect(ifcData.buildingName).to.equal("");
      expect(ifcData.buildingHeight).to.equal(0);
      expect(ifcData.buildingArea).to.equal(0);
      expect(ifcData.buildingVolume).to.equal(0);
    });
  });
});
