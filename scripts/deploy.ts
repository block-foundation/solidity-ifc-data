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


import { ethers } from "hardhat";

/**
 * @file Deployment script for the IFCDataContract.sol contract
 * @dev Before running the script, make sure you have the environment variables properly configured and the dependencies installed
 */

async function main() {
  // Get the Signer (account) that will be used to deploy the contract
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  // Print the balance of the Signer's account
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Get the ContractFactory for our contract
  const IFCDataContract = await ethers.getContractFactory("IFCDataContract");
  
  /**
   * Deploy the contract
   * In this example, we're simply passing the deployer's address as the oracle's address. 
   * In a real-world scenario, you would pass the actual oracle contract address here.
   */
  const ifcDataContract = await IFCDataContract.deploy(deployer.address);

  // Print the address of the newly deployed contract
  console.log("IFCDataContract address:", ifcDataContract.address);
}

// Call the main function and handle any uncaught exceptions
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
