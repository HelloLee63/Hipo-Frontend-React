import BigNumber from "bignumber.js";
import Web3Contract from "../web3Contract";

export const FinancingPoolABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bondDuration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bondAmount",
				"type": "uint256"
			}
		],
		"name": "addLiquidity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "liquidityProvider",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "bondDuration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bondAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "interestLiquidity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "principalLiquidity",
				"type": "uint256"
			}
		],
		"name": "AddLiquidity",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			}
		],
		"name": "CollateralDisabled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			}
		],
		"name": "CollateralEnabled",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "balanceFromBefore",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "balanceToBefore",
				"type": "uint256"
			}
		],
		"name": "finalizeTransfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "underlyingAssetA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "underlyingAssetB",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "colTokenAddress",
				"type": "address"
			}
		],
		"name": "initCollateral",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IPoolAddressesProvider",
				"name": "provider",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "hipoAmmV1Router02",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "hipoFactory",
				"type": "address"
			}
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "bondTokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "debtTokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "interestTokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "hipoLpTokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "hipoTreasuryAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "hipoFeeAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "hipoProtocolFeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bondDuration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "initReserve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bondAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bondDuration",
				"type": "uint256"
			}
		],
		"name": "issue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "bondAsset",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bondAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bondDuration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "interestAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "issuerFee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "debtId",
				"type": "uint256"
			}
		],
		"name": "Issue",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "debtAsset",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "debtId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "debtToCover",
				"type": "uint256"
			}
		],
		"name": "liquidationCall",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "debtAsset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "debtToCover",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "liquidatedCollateralAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "liquidator",
				"type": "address"
			}
		],
		"name": "LiquidationCall",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "debtAsset",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "debtId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "debtToCover",
				"type": "uint256"
			}
		],
		"name": "liquidationCallToExpiredDebts",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "debtAsset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "debtToCover",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "liquidatedCollateralAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "liquidator",
				"type": "address"
			}
		],
		"name": "LiquidationCallToExpiredDebts",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "collateralAssetAmount",
				"type": "uint256"
			}
		],
		"name": "pledge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "collateralAssetAmount",
				"type": "uint256"
			}
		],
		"name": "Pledge",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bondAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bondAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "investorFee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "principalAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "interestAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bondId",
				"type": "uint256"
			}
		],
		"name": "Purchase",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "collateralAssetAmount",
				"type": "uint256"
			}
		],
		"name": "redeem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "collateralAssetAmount",
				"type": "uint256"
			}
		],
		"name": "Redeem",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bondDuration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bondAmount",
				"type": "uint256"
			}
		],
		"name": "removeLiquidity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "liquidityProvider",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "bondDuration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bondAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "interestLiquidity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "principalLiquidity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lpFee",
				"type": "uint256"
			}
		],
		"name": "RemoveLiquidity",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountSent",
				"type": "uint256"
			}
		],
		"name": "repay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountToRepay",
				"type": "uint256"
			}
		],
		"name": "Repay",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			}
		],
		"name": "setBondTypes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "collateralConfiguration",
				"type": "uint256"
			}
		],
		"name": "setCollateralConfiguration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "val",
				"type": "bool"
			}
		],
		"name": "setPause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reserveConfiguration",
				"type": "uint256"
			}
		],
		"name": "setReserveConfiguration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "withdrawAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "withdrawImmaturityBonds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountToWithdraw",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "resetFee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "resetInterests",
				"type": "uint256"
			}
		],
		"name": "WithdrawImmaturityBonds",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "withdrawMaturityBonds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountToWithdraw",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bondAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTimestamp",
				"type": "uint256"
			}
		],
		"name": "WithdrawMaturityBonds",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "FINANCING_POOL_REVISION",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GET_FACTORY",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GET_ROUTER02",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			}
		],
		"name": "getCollateralConfiguration",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "data",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.CollateralConfigurationMap",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collateralAsset",
				"type": "address"
			}
		],
		"name": "getCollateralData",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "data",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.CollateralConfigurationMap",
						"name": "collateralConfiguration",
						"type": "tuple"
					},
					{
						"internalType": "address",
						"name": "collateralAsset",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "colTokenAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "underlyingAssetA",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "underlyingAssetB",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.CollateralData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCollateralsList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "investor",
				"type": "address"
			}
		],
		"name": "getInvestorConfig",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "data",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.InvestorConfigurationMap",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			}
		],
		"name": "getIssuerConfig",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "data",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.IssuerConfigurationMap",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getReserveConfiguration",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "data",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.ReserveConfigurationMap",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getReserveData",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "data",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.ReserveConfigurationMap",
						"name": "reserveConfiguration",
						"type": "tuple"
					},
					{
						"internalType": "address",
						"name": "asset",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bondDuration",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bondTokenAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "debtTokenAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "interestTokenAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "hipoLpTokenAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "hipoTreasuryAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "hipoFeeAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "hipoProtocolFeeAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.ReserveData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			}
		],
		"name": "getReserveId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getReservesList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "asset",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.Reserve[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_NUMBER_COLLATERALS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_NUMBER_RESERVES",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

class FinancingPoolContract extends Web3Contract {
  constructor(address) {
    super(FinancingPoolABI, address)
  }

  reserves

  async getReservesList() {
    const reserves = await this.call('getReservesList', [])
    this.reserves = reserves
    this. emit(Web3Contract.UPDATE_DATA)
  }

  async pledge(collateralAsset, collateralAssetAmount) {
    if (!this.account) {
      return Promise.reject()
    }

    return await this.send('pledge', [collateralAsset, collateralAssetAmount], {
      from: this.account
    })
  }

  redeem(collateralAsset, amount) {
    if (!this.account) {
      return Promise.reject()
    }

    return this.send('redeem', [collateralAsset, amount], {
      from: this.account
    })
  }

  async addLiquidity(asset, duration, amount) {

    if (!this.account) {
      return Promise.reject()
    }

	// const amountBigNumber = new BigNumber(amount)

    return await this.send('addLiquidity', [asset, duration, amount], {
      from: this.account
    })
  }

  removeLiquidity(asset, duration, amount ) {
	  if (!this.account) {
		  return Promise.reject()
	  }

	  return this.send('removeLiquidity', [asset, duration, amount], {
		  from: this.account
	  })
  }

  purchase(asset, duration, amount) {
    
    if (!this.account) {
      return Promise.reject()
    }

    return this.send('purchase', [asset, duration, amount], {
      from: this.account
    })
  }

  issue(collateralAsset, asset, amount, duration) {
    if (!this.account) {
      return Promise.reject()
    }

    return this.send('issue', [collateralAsset, asset, amount, duration], {
      from: this.account
    })
  }

  repay(collateralAsset, asset, duration, id, amount) {
    if (!this.account) {
      return Promise.reject()
    }

    return this.send('repay', [collateralAsset, asset, duration, amount, id], {
      from: this.account
    })
  }

  withdrawMaturityBonds(asset, duration, id) {
	  if (!this.account) {
      return Promise.reject()
    }

    return this.send('withdrawMaturityBonds', [asset, duration, id], {
      from: this.account
    })
  }

  withdrawImmaturityBonds(asset, duration, withdrawAmount, id) {
    if (!this.account) {
      return Promise.reject()
    }

    return this.send('withdrawImmaturityBonds', [asset, duration, withdrawAmount, id], {
      from: this.account
    })
  }  
}

export default FinancingPoolContract