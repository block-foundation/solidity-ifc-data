# solidity-ifc-data

<br clear="both"/>

---

<div align="right">

  ![Report a Bug](https://img.shields.io/badge/Report%20a%20Bug-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5&link=https%3A%2F%2Fgithub.com%2Fblock-foundation%2Fbrand%2Fissues%2Fnew%3Fassignees%3D%26labels%3DNeeds%253A%2BTriage%2B%253Amag%253A%252Ctype%253Abug-suspected%26template%3Dbug_report.yml)
  ![Request a Feature](https://img.shields.io/badge/Request%20a%20Feature-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5&link=https%3A%2F%2Fgithub.com%2Fblock-foundation%2Fbrand%2Fissues%2Fnew%3Fassignees%3D%26labels%3DNeeds%253A%2BTriage%2B%253Amag%253A%252Ctype%253Afeature-request%252CHelp%2Bwanted%2B%25F0%259F%25AA%25A7%26template%3Dfeature_request.yml)
  ![Ask a Question](https://img.shields.io/badge/Ask%20a%20Question-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5&link=https%3A%2F%2Fgithub.com%2Fblock-foundation%2Fbrand%2Fissues%2Fnew%3Fassignees%3D%26labels%3DNeeds%253A%2BTriage%2B%253Amag%253A%252Ctype%253Aquestion%26template%3Dquestion.yml)
  ![Make a Suggestion](https://img.shields.io/badge/Make%20a%20Suggestion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5&link=https%3A%2F%2Fgithub.com%2Fblock-foundation%2Fbrand%2Fissues%2Fnew%3Fassignees%3D%26labels%3DNeeds%253A%2BTriage%2B%253Amag%253A%252Ctype%253Aenhancement%26template%3Dsuggestion.yml)
  ![Start a Discussion](https://img.shields.io/badge/Start%20a%20Discussion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5&link=https%3A%2F%2Fgithub.com%2Fblock-foundation%2Fbrand%2Fdiscussions)

</div>


## Introduction

The `IFCDataContract` is a Solidity smart contract designed to integrate with Industry Foundation Classes (IFC) data via an Oracle. 

> IFC is a data standard used widely in the architecture, engineering, and construction (AEC) industry to facilitate interoperability between different software used in these fields. The data standard encompasses various elements of building information modeling (BIM) including building elements, cost management, project management, structural elements, and more.

The `IFCDataContract` contract acts as a client contract in a decentralized oracle network and is designed to request specific IFC data from an external data source, receive and store that data, and then provide access to the stored data.

The contract includes:

- A function (`requestIFCData`) to request IFC data from the oracle. This function emits a `ReceivedNewRequestId` event that includes the unique request ID for tracking the request.
- A function (`fulfillIFCData`) that is used by the oracle to fulfill the data request. This function updates the contract's state with the received data and emits an `IFCDataUpdated` event.
- A function (`getIFCData`) to access the stored IFC data using the request ID.

The contract is derived from the `Ownable` contract, giving it a basic access control mechanism with an owner role. The owner can request IFC data, while the oracle is the only address authorized to fulfill data requests.

This contract represents a simple yet powerful example of how blockchain technology can interact with industry-specific standards like IFC, enabling the creation of decentralized applications that can serve specialized use cases in sectors such as construction and architecture.

Please note, this contract serves as a conceptual demonstration and needs thorough testing, auditing, and potential modifications before any production use. Always exercise caution and due diligence when working with smart contracts.

## Class Diagram

```mermaid
classDiagram

  class IFCDataContract {
    -address public oracle
    -mapping(bytes32 => IFCData) private ifcData
    -event ReceivedNewRequestId(bytes32 indexed requestId)
    -event IFCDataUpdated(bytes32 indexed requestId, string buildingName, uint256 buildingHeight, uint256 buildingArea, uint256 buildingVolume)
    -modifier onlyOracle()
    +function requestIFCData() public onlyOwner
    +function fulfillIFCData(bytes32 _requestId, string memory _buildingName, uint256 _buildingHeight, uint256 _buildingArea, uint256 _buildingVolume) public onlyOracle
    +function getIFCData(bytes32 _requestId) public view returns (IFCData memory)
  }

  class Ownable {
    -address public owner
    -event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
    -modifier onlyOwner()
    +function transferOwnership(address newOwner) public onlyOwner
  }

  class IFCData {
    string buildingName
    uint256 buildingHeight
    uint256 buildingArea
    uint256 buildingVolume
  }

  IFCDataContract --|> Ownable
```

In this diagram:

- `IFCDataContract` is the main contract.
- It is a subclass of `Ownable`, meaning it inherits from the `Ownable` contract.
- `IFCData` is a struct used in the `IFCDataContract` contract.
- The contract has a mapping called `ifcData` from `bytes32` to `IFCData`.
- Functions, modifiers, and events in the contract are also represented.
