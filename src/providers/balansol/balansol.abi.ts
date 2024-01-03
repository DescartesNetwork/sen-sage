export type BalancerAmm = {
  version: '0.1.0'
  name: 'balancer_amm'
  instructions: [
    {
      name: 'initializePool'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: true
        },
        {
          name: 'taxman'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'mintLpt'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'fee'
          type: 'u64'
        },
        {
          name: 'tax'
          type: 'u64'
        },
        {
          name: 'mints'
          type: {
            vec: 'publicKey'
          }
        },
        {
          name: 'treasuries'
          type: {
            vec: 'publicKey'
          }
        },
        {
          name: 'weights'
          type: {
            vec: 'u64'
          }
        },
        {
          name: 'actions'
          type: {
            vec: {
              defined: 'MintActionState'
            }
          }
        },
      ]
    },
    {
      name: 'initializeJoin'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
        {
          name: 'taxman'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'mintLpt'
          isMut: true
          isSigner: false
        },
        {
          name: 'associatedTokenAccountLpt'
          isMut: true
          isSigner: false
        },
        {
          name: 'mint'
          isMut: false
          isSigner: false
        },
        {
          name: 'dstTreasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'srcAssociatedTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenAccountTaxman'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
      ]
    },
    {
      name: 'addLiquidity'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
        {
          name: 'taxman'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'mintLpt'
          isMut: true
          isSigner: false
        },
        {
          name: 'associatedTokenAccountLpt'
          isMut: true
          isSigner: false
        },
        {
          name: 'associatedTokenAccountLptTaxman'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'amountsIn'
          type: {
            vec: 'u64'
          }
        },
      ]
    },
    {
      name: 'removeLiquidity'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'mintLpt'
          isMut: true
          isSigner: false
        },
        {
          name: 'associatedTokenAccountLpt'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
        {
          name: 'this'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'amountsLpt'
          type: 'u64'
        },
      ]
    },
    {
      name: 'swap'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
        {
          name: 'taxman'
          isMut: false
          isSigner: false
        },
        {
          name: 'bidMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'srcTreasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'srcAssociatedTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'askMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'dstTreasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'dstAssociatedTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'dstTokenAccountTaxman'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'bidAmount'
          type: 'u64'
        },
        {
          name: 'limit'
          type: 'u64'
        },
      ]
      returns: 'u64'
    },
    {
      name: 'route'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
        {
          name: 'this'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'bidAmount'
          type: 'u64'
        },
        {
          name: 'limit'
          type: 'u64'
        },
      ]
    },
    {
      name: 'updateWeights'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
      ]
      args: [
        {
          name: 'weights'
          type: {
            vec: 'u64'
          }
        },
      ]
    },
    {
      name: 'finalizePool'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'freezePool'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'thawPool'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'transferOwnership'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
      ]
      args: [
        {
          name: 'owner'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'updateActions'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
      ]
      args: [
        {
          name: 'actions'
          type: {
            vec: {
              defined: 'MintActionState'
            }
          }
        },
      ]
    },
    {
      name: 'updateFee'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
      ]
      args: [
        {
          name: 'fee'
          type: 'u64'
        },
        {
          name: 'taxFee'
          type: 'u64'
        },
      ]
    },
    {
      name: 'closePool'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'pool'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
        {
          name: 'this'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'safeTransfer'
      accounts: [
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'mint'
          isMut: false
          isSigner: false
        },
        {
          name: 'src'
          isMut: false
          isSigner: true
        },
        {
          name: 'srcTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'dst'
          isMut: false
          isSigner: false
        },
        {
          name: 'dstTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
      ]
    },
  ]
  accounts: [
    {
      name: 'pool'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'fee'
            type: 'u64'
          },
          {
            name: 'tax'
            type: 'u64'
          },
          {
            name: 'state'
            type: {
              defined: 'PoolState'
            }
          },
          {
            name: 'mintLpt'
            type: 'publicKey'
          },
          {
            name: 'taxman'
            type: 'publicKey'
          },
          {
            name: 'mints'
            type: {
              vec: 'publicKey'
            }
          },
          {
            name: 'actions'
            type: {
              vec: {
                defined: 'MintActionState'
              }
            }
          },
          {
            name: 'treasuries'
            type: {
              vec: 'publicKey'
            }
          },
          {
            name: 'reserves'
            type: {
              vec: 'u64'
            }
          },
          {
            name: 'weights'
            type: {
              vec: 'u64'
            }
          },
        ]
      }
    },
  ]
  types: [
    {
      name: 'PoolState'
      docs: ['', 'Pool state', '']
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Uninitialized'
          },
          {
            name: 'Initialized'
          },
          {
            name: 'Frozen'
          },
          {
            name: 'Deleted'
          },
          {
            name: 'Initializing'
          },
        ]
      }
    },
    {
      name: 'MintActionState'
      docs: ['', 'Mint state', '']
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Active'
          },
          {
            name: 'BidOnly'
          },
          {
            name: 'AskOnly'
          },
          {
            name: 'Paused'
          },
        ]
      }
    },
  ]
  events: [
    {
      name: 'AddLiquidityEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amountsIn'
          type: {
            vec: 'u64'
          }
          index: false
        },
        {
          name: 'lptPrintAmount'
          type: 'u64'
          index: false
        },
        {
          name: 'lptTaxmanFee'
          type: 'u64'
          index: false
        },
      ]
    },
    {
      name: 'ClosePoolEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
      ]
    },
    {
      name: 'FinalizePoolEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
      ]
    },
    {
      name: 'FreezePoolEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
      ]
    },
    {
      name: 'StartPoolEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
        {
          name: 'startingLptAmount'
          type: 'u64'
          index: false
        },
      ]
    },
    {
      name: 'InitializeJoinPoolEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
        {
          name: 'mint'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amountIn'
          type: 'u64'
          index: false
        },
      ]
    },
    {
      name: 'InitializePoolEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
        {
          name: 'fee'
          type: 'u64'
          index: false
        },
        {
          name: 'tax'
          type: 'u64'
          index: false
        },
        {
          name: 'mints'
          type: {
            vec: 'publicKey'
          }
          index: false
        },
        {
          name: 'treasuries'
          type: {
            vec: 'publicKey'
          }
          index: false
        },
        {
          name: 'weights'
          type: {
            vec: 'u64'
          }
          index: false
        },
        {
          name: 'actions'
          type: {
            vec: {
              defined: 'MintActionState'
            }
          }
          index: false
        },
      ]
    },
    {
      name: 'RemoveLiquidityEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amountLpt'
          type: 'u64'
          index: false
        },
        {
          name: 'amountsOut'
          type: {
            vec: 'u64'
          }
          index: false
        },
      ]
    },
    {
      name: 'RouteEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'bidMint'
          type: 'publicKey'
          index: false
        },
        {
          name: 'askMint'
          type: 'publicKey'
          index: false
        },
        {
          name: 'bidAmount'
          type: 'u64'
          index: false
        },
        {
          name: 'limit'
          type: 'u64'
          index: false
        },
        {
          name: 'askAmount'
          type: 'u64'
          index: false
        },
      ]
    },
    {
      name: 'SwapEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
        {
          name: 'bidMint'
          type: 'publicKey'
          index: false
        },
        {
          name: 'askMint'
          type: 'publicKey'
          index: false
        },
        {
          name: 'bidAmount'
          type: 'u64'
          index: false
        },
        {
          name: 'limit'
          type: 'u64'
          index: false
        },
        {
          name: 'askAmount'
          type: 'u64'
          index: false
        },
        {
          name: 'totalTaxFeeAmount'
          type: 'u64'
          index: false
        },
      ]
    },
    {
      name: 'ThawPoolEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
      ]
    },
    {
      name: 'TransferOwnershipEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'newOwner'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
      ]
    },
    {
      name: 'UpdateActionsEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
        {
          name: 'actions'
          type: {
            vec: {
              defined: 'MintActionState'
            }
          }
          index: false
        },
      ]
    },
    {
      name: 'UpdateFeeEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
        {
          name: 'fee'
          type: 'u64'
          index: false
        },
        {
          name: 'tax'
          type: 'u64'
          index: false
        },
      ]
    },
    {
      name: 'UpdateWeightsEvent'
      fields: [
        {
          name: 'authority'
          type: 'publicKey'
          index: false
        },
        {
          name: 'pool'
          type: 'publicKey'
          index: false
        },
        {
          name: 'weights'
          type: {
            vec: 'u64'
          }
          index: false
        },
      ]
    },
  ]
  errors: [
    {
      code: 6000
      name: 'Overflow'
      msg: 'Operation overflowed'
    },
    {
      code: 6001
      name: 'InvalidPermission'
      msg: 'Not have permission!'
    },
    {
      code: 6002
      name: 'ParamsLength'
      msg: 'Invalid length of parameters!'
    },
    {
      code: 6003
      name: 'ParamsZero'
      msg: 'Zero value is invalid!'
    },
    {
      code: 6004
      name: 'ParamsWeights'
      msg: 'Invalid weights!'
    },
    {
      code: 6005
      name: 'AccountMint'
      msg: 'Invalid mint address!'
    },
    {
      code: 6006
      name: 'AccountTreasury'
      msg: 'Invalid treasury address!'
    },
    {
      code: 6007
      name: 'InvalidPoolState'
      msg: 'Invalid pool state!'
    },
    {
      code: 6008
      name: 'PoolStopped'
      msg: 'The pool was stopped!'
    },
    {
      code: 6009
      name: 'PoolInactive'
      msg: 'The pool is inactive!'
    },
    {
      code: 6010
      name: 'PoolNotFrozen'
      msg: 'The pool is not frozen!'
    },
    {
      code: 6011
      name: 'MintState'
      msg: 'Invalid mint state!'
    },
    {
      code: 6012
      name: 'CalcStartingLpt'
      msg: 'Cant calculate starting lpt'
    },
    {
      code: 6013
      name: 'CalcWithdrawSingle'
      msg: 'Cant withdraw sigle'
    },
    {
      code: 6014
      name: 'CalcSwap'
      msg: 'Cant calculate swap'
    },
    {
      code: 6015
      name: 'CalcFullSizeLpt'
      msg: 'Cant calculate full side lpt'
    },
    {
      code: 6016
      name: 'CalcWithdrawLpt'
      msg: 'Cant calculate withdraw lpt'
    },
    {
      code: 6017
      name: 'CalcSideSizeLpt'
      msg: 'Cant calculate full side lpt'
    },
    {
      code: 6018
      name: 'Slippage'
      msg: 'Large slippage'
    },
    {
      code: 6019
      name: 'TooManyReferrers'
      msg: 'Too many referrer addresses.'
    },
  ]
}

export const IDL: BalancerAmm = {
  version: '0.1.0',
  name: 'balancer_amm',
  instructions: [
    {
      name: 'initializePool',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'taxman',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mintLpt',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'fee',
          type: 'u64',
        },
        {
          name: 'tax',
          type: 'u64',
        },
        {
          name: 'mints',
          type: {
            vec: 'publicKey',
          },
        },
        {
          name: 'treasuries',
          type: {
            vec: 'publicKey',
          },
        },
        {
          name: 'weights',
          type: {
            vec: 'u64',
          },
        },
        {
          name: 'actions',
          type: {
            vec: {
              defined: 'MintActionState',
            },
          },
        },
      ],
    },
    {
      name: 'initializeJoin',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'taxman',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mintLpt',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'associatedTokenAccountLpt',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dstTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'srcAssociatedTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAccountTaxman',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'addLiquidity',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'taxman',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mintLpt',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'associatedTokenAccountLpt',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'associatedTokenAccountLptTaxman',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amountsIn',
          type: {
            vec: 'u64',
          },
        },
      ],
    },
    {
      name: 'removeLiquidity',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mintLpt',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'associatedTokenAccountLpt',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'this',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amountsLpt',
          type: 'u64',
        },
      ],
    },
    {
      name: 'swap',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'taxman',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'bidMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'srcTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'srcAssociatedTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'askMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dstTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dstAssociatedTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dstTokenAccountTaxman',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bidAmount',
          type: 'u64',
        },
        {
          name: 'limit',
          type: 'u64',
        },
      ],
      returns: 'u64',
    },
    {
      name: 'route',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'this',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bidAmount',
          type: 'u64',
        },
        {
          name: 'limit',
          type: 'u64',
        },
      ],
    },
    {
      name: 'updateWeights',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'weights',
          type: {
            vec: 'u64',
          },
        },
      ],
    },
    {
      name: 'finalizePool',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'freezePool',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'thawPool',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'transferOwnership',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'owner',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'updateActions',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'actions',
          type: {
            vec: {
              defined: 'MintActionState',
            },
          },
        },
      ],
    },
    {
      name: 'updateFee',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'fee',
          type: 'u64',
        },
        {
          name: 'taxFee',
          type: 'u64',
        },
      ],
    },
    {
      name: 'closePool',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'this',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'safeTransfer',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'src',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'srcTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dst',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dstTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'pool',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'fee',
            type: 'u64',
          },
          {
            name: 'tax',
            type: 'u64',
          },
          {
            name: 'state',
            type: {
              defined: 'PoolState',
            },
          },
          {
            name: 'mintLpt',
            type: 'publicKey',
          },
          {
            name: 'taxman',
            type: 'publicKey',
          },
          {
            name: 'mints',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'actions',
            type: {
              vec: {
                defined: 'MintActionState',
              },
            },
          },
          {
            name: 'treasuries',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'reserves',
            type: {
              vec: 'u64',
            },
          },
          {
            name: 'weights',
            type: {
              vec: 'u64',
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'PoolState',
      docs: ['', 'Pool state', ''],
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Uninitialized',
          },
          {
            name: 'Initialized',
          },
          {
            name: 'Frozen',
          },
          {
            name: 'Deleted',
          },
          {
            name: 'Initializing',
          },
        ],
      },
    },
    {
      name: 'MintActionState',
      docs: ['', 'Mint state', ''],
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Active',
          },
          {
            name: 'BidOnly',
          },
          {
            name: 'AskOnly',
          },
          {
            name: 'Paused',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'AddLiquidityEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amountsIn',
          type: {
            vec: 'u64',
          },
          index: false,
        },
        {
          name: 'lptPrintAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'lptTaxmanFee',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'ClosePoolEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'FinalizePoolEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'FreezePoolEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'StartPoolEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'startingLptAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'InitializeJoinPoolEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'mint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amountIn',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'InitializePoolEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'fee',
          type: 'u64',
          index: false,
        },
        {
          name: 'tax',
          type: 'u64',
          index: false,
        },
        {
          name: 'mints',
          type: {
            vec: 'publicKey',
          },
          index: false,
        },
        {
          name: 'treasuries',
          type: {
            vec: 'publicKey',
          },
          index: false,
        },
        {
          name: 'weights',
          type: {
            vec: 'u64',
          },
          index: false,
        },
        {
          name: 'actions',
          type: {
            vec: {
              defined: 'MintActionState',
            },
          },
          index: false,
        },
      ],
    },
    {
      name: 'RemoveLiquidityEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amountLpt',
          type: 'u64',
          index: false,
        },
        {
          name: 'amountsOut',
          type: {
            vec: 'u64',
          },
          index: false,
        },
      ],
    },
    {
      name: 'RouteEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'bidMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'askMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'bidAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'limit',
          type: 'u64',
          index: false,
        },
        {
          name: 'askAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'SwapEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'bidMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'askMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'bidAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'limit',
          type: 'u64',
          index: false,
        },
        {
          name: 'askAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalTaxFeeAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'ThawPoolEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'TransferOwnershipEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'newOwner',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'UpdateActionsEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'actions',
          type: {
            vec: {
              defined: 'MintActionState',
            },
          },
          index: false,
        },
      ],
    },
    {
      name: 'UpdateFeeEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'fee',
          type: 'u64',
          index: false,
        },
        {
          name: 'tax',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'UpdateWeightsEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pool',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'weights',
          type: {
            vec: 'u64',
          },
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'Overflow',
      msg: 'Operation overflowed',
    },
    {
      code: 6001,
      name: 'InvalidPermission',
      msg: 'Not have permission!',
    },
    {
      code: 6002,
      name: 'ParamsLength',
      msg: 'Invalid length of parameters!',
    },
    {
      code: 6003,
      name: 'ParamsZero',
      msg: 'Zero value is invalid!',
    },
    {
      code: 6004,
      name: 'ParamsWeights',
      msg: 'Invalid weights!',
    },
    {
      code: 6005,
      name: 'AccountMint',
      msg: 'Invalid mint address!',
    },
    {
      code: 6006,
      name: 'AccountTreasury',
      msg: 'Invalid treasury address!',
    },
    {
      code: 6007,
      name: 'InvalidPoolState',
      msg: 'Invalid pool state!',
    },
    {
      code: 6008,
      name: 'PoolStopped',
      msg: 'The pool was stopped!',
    },
    {
      code: 6009,
      name: 'PoolInactive',
      msg: 'The pool is inactive!',
    },
    {
      code: 6010,
      name: 'PoolNotFrozen',
      msg: 'The pool is not frozen!',
    },
    {
      code: 6011,
      name: 'MintState',
      msg: 'Invalid mint state!',
    },
    {
      code: 6012,
      name: 'CalcStartingLpt',
      msg: 'Cant calculate starting lpt',
    },
    {
      code: 6013,
      name: 'CalcWithdrawSingle',
      msg: 'Cant withdraw sigle',
    },
    {
      code: 6014,
      name: 'CalcSwap',
      msg: 'Cant calculate swap',
    },
    {
      code: 6015,
      name: 'CalcFullSizeLpt',
      msg: 'Cant calculate full side lpt',
    },
    {
      code: 6016,
      name: 'CalcWithdrawLpt',
      msg: 'Cant calculate withdraw lpt',
    },
    {
      code: 6017,
      name: 'CalcSideSizeLpt',
      msg: 'Cant calculate full side lpt',
    },
    {
      code: 6018,
      name: 'Slippage',
      msg: 'Large slippage',
    },
    {
      code: 6019,
      name: 'TooManyReferrers',
      msg: 'Too many referrer addresses.',
    },
  ],
}
