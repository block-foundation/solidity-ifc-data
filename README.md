<div align="right">

[![GitHub License](https://img.shields.io/github/license/block-foundation/blocktxt?style=flat-square&logo=readthedocs&logoColor=FFFFFF&label=&labelColor=%23041B26&color=%23041B26&link=LICENSE)](https://github.com/block-foundation/solidity-ifc-data/blob/main/LICENSE)
[![devContainer](https://img.shields.io/badge/Container-Remote?style=flat-square&logo=visualstudiocode&logoColor=%23FFFFFF&label=Remote&labelColor=%23041B26&color=%23041B26)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/block-foundation/solidity-ifc-data)

</div>

---

<div>
    <img align="right" src="https://raw.githubusercontent.com/block-foundation/brand/master/src/logo/logo_gray.png" width="96" alt="Block Foundation Logo">
    <h1 align="left">IFC Data</h1>
    <h3 align="left">Block Foundation Smart Contract Series [Solidity]</h3>
</div>

---

<img align="right" width="75%" src="https://raw.githubusercontent.com/block-foundation/brand/master/src/image/repository_cover/block_foundation-structure-03-accent.jpg"  alt="Block Foundation Brand">

### Contents

- [Introduction](#introduction)
- [Colophon](#colophon)

<br clear="both"/>

---

<div align="right">

[![Report a Bug](https://img.shields.io/badge/Report%20a%20Bug-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5)](https://github.com/block-foundation/solidity-ifc-data/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=bug_report.yml)
[![Request a Feature](https://img.shields.io/badge/Request%20a%20Feature-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5)](https://github.com/block-foundation/solidity-ifc-data/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=feature_request.yml)
[![Ask a Question](https://img.shields.io/badge/Ask%20a%20Question-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5)](https://github.com/block-foundation/solidity-ifc-data/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=question.yml)
[![Make a Suggestion](https://img.shields.io/badge/Make%20a%20Suggestion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5)](https://github.com/block-foundation/solidity-ifc-data/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=suggestion.yml)
[![Start a Discussion](https://img.shields.io/badge/Start%20a%20Discussion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5)](https://github.com/block-foundation/solidity-ifc-data/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=discussion.yml)

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

``` mermaid
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



---

## Colophon

### Authors

This is an open-source project by the **[Block Foundation](https://www.blockfoundation.io "Block Foundation website")**.

The Block Foundation mission is enabling architects to take back initiative and contribute in solving the mismatch in housing through blockchain technology. Therefore the Block Foundation seeks to unschackle the traditional constraints and construct middle ground between rent and the rigidity of traditional mortgages.

website: [www.blockfoundation.io](https://www.blockfoundation.io "Block Foundation website")

### Development Resources

#### Contributing

We'd love for you to contribute and to make this project even better than it is today!
Please refer to the [contribution guidelines](.github/CONTRIBUTING.md) for information.

### Legal Information

#### Copyright

Copyright &copy; 2023 [Stichting Block Foundation](https://www.blockfoundation.io/ "Block Foundation website"). All Rights Reserved.

#### License

Except as otherwise noted, the content in this repository is licensed under the
[Creative Commons Attribution 4.0 International (CC BY 4.0) License](https://creativecommons.org/licenses/by/4.0/), and
code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0).

Also see [LICENSE](https://github.com/block-foundation/community/blob/master/src/LICENSE) and [LICENSE-CODE](https://github.com/block-foundation/community/blob/master/src/LICENSE-CODE).

#### Disclaimer

**THIS SOFTWARE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
