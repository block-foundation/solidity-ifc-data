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


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title IFC Data Contract
 * @dev This contract demonstrates a basic example of how an Industry Foundation Classes (IFC) data
 * could theoretically be interacted with using a Chainlink oracle to fetch and store data.
 * This contract does not represent a complete implementation and is for illustrative purposes only.
 */
contract IFCDataContract {
    AggregatorV3Interface internal oracle;
    address private owner;
    
    /**
     * @dev Struct representing a subset of IFC data for a building
     * @param buildingName The name of the building
     * @param buildingHeight The height of the building
     * @param buildingArea The area of the building
     * @param buildingVolume The volume of the building
     * @param timestamp When the data was stored
     */
    struct IFCData {
        string buildingName;
        uint buildingHeight;
        uint buildingArea;
        uint buildingVolume;
        uint timestamp;
    }

    mapping(bytes32 => IFCData) private ifcData;  // map a request ID to IFC data
    
    event ReceivedNewRequestId(bytes32 id);
    event IFCDataUpdated(bytes32 id);

    /**
     * @dev Restricts the function to only be called by the contract's owner.
     */
    modifier onlyOwner {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    /**
     * @dev Contract constructor sets the oracle address and sets the contract deployer as owner.
     * @param _oracle The address of the oracle
     */
    constructor(address _oracle) {
        oracle = AggregatorV3Interface(_oracle);
        owner = msg.sender;
    }

    /**
     * @dev Requests IFC data from the oracle. Can only be called by the owner.
     * @return id The ID of the data request
     */
    function requestIFCData() public onlyOwner returns (bytes32) {
        bytes32 id = oracle.requestData();  // Replace this with the actual oracle function
        emit ReceivedNewRequestId(id);
        return id;
    }

    /**
     * @dev Fulfills a data request from the oracle.
     * @param _requestId The ID of the data request
     * @param _buildingName The name of the building
     * @param _buildingHeight The height of the building
     * @param _buildingArea The area of the building
     * @param _buildingVolume The volume of the building
     */
    function fulfillIFCData(bytes32 _requestId, string memory _buildingName, uint _buildingHeight, uint _buildingArea, uint _buildingVolume) public {
        // Only the oracle should be able to fulfill data requests.
        require(msg.sender == address(oracle), "Caller is not the oracle");

        IFCData memory data = IFCData({
            buildingName: _buildingName,
            buildingHeight: _buildingHeight,
            buildingArea: _buildingArea,
            buildingVolume: _buildingVolume,
            timestamp: block.timestamp
        });

        ifcData[_requestId] = data;

        emit IFCDataUpdated(_requestId);
    }

    /**
     * @dev Retrieves the IFC data associated with a given request ID.
     * @param _requestId The ID of the data request
     * @return The IFC data
     */
    function getIFCData(bytes32 _requestId) public view returns (string memory, uint, uint, uint, uint) {
        return (
            ifcData[_requestId].buildingName,
            ifcData[_requestId].buildingHeight,
            ifcData[_requestId].buildingArea,
            ifcData[_requestId].buildingVolume,
            ifcData[_requestId].timestamp
        );
    }
}
