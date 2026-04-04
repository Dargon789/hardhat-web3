import {
  type GetBalanceReturnType,
  type GetBlockNumberReturnType,
  getBalance,
  getBlockNumber,
  reconnect,
  watchBlockNumber,
} from '@wagmi/core'
import { useEffect, useReducer, useState } from 'react'

import { formatEther } from 'viem'
import { config } from './wagmi'

function App() {
  useEffect(() => {
    reconnect(config)
  }, [])

  return (
    <>
      <Connect />
      <Balance />
      <BlockNumber />
    </>
  )
}


  useEffect(() => {
      onChange(data) {
      },
    })
  }, [])

  return (
    <div>

      <div>
        <br />
        <br />
      </div>

        <button type="button" onClick={() => disconnect(config)}>
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const [, rerender] = useReducer((count) => count + 1, 0)

  useEffect(() => {
    return config.subscribe(({ connections }) => connections, rerender)
  }, [])

  return (
    <div>
      <h2>Connect</h2>

      {config.connectors.map((connector) => (
        <button
          disabled={config.state.connections.has(connector.uid)}
          id={connector.uid}
          key={connector.uid}
          onClick={async () => await connect(config, { connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}

  const [, rerender] = useReducer((count) => count + 1, 0)

  useEffect(() => {
    return config.subscribe(
      ({ connections, current }) => ({ connections, current }),
      rerender,
    )
  }, [])

  return (
    <div>

      {config.connectors
        .filter((connector) => config.state.connections.has(connector.uid))
        .map((connector) => (
          <button
            disabled={config.state.current === connector.uid}
            id={connector.uid}
            key={connector.uid}
            type="button"
          >
            {connector.name}
          </button>
        ))}
    </div>
  )
}

function Balance() {

  useEffect(() => {
      onChange(data) {
      },
    })
  }, [])

  /////////////////////////////////////////////////////////

  const [balance, setBalance] = useState<GetBalanceReturnType | undefined>()

  useEffect(() => {
    return watchBlockNumber(config, {
      async onBlockNumber() {
        try {
          const balance = await getBalance(config, {
          })
          setBalance(balance)
        } catch (error) {
          console.error('Error fetching balance', error)
        }
      },
    })

  return (
    <div>
      <h2>Balance</h2>

      <div>Balance: {!!balance?.value && formatEther(balance.value)}</div>
    </div>
  )
}

function BlockNumber() {
  const [blockNumber, setBlockNumber] = useState<
    GetBlockNumberReturnType | undefined
  >()

  useEffect(() => {
    ;(async () => {
      setBlockNumber(await getBlockNumber(config))

      watchBlockNumber(config, { onBlockNumber: setBlockNumber })
    })()
  }, [])

  return (
    <div>
      <h2>Block Number</h2>

      <div>Block Number (Default Chain): {blockNumber?.toString()}</div>
    </div>
  )
}

export default App
