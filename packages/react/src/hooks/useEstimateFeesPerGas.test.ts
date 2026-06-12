import { useEstimateFeesPerGas } from './useEstimateFeesPerGas.js'

test('default', async () => {


  expect(Object.keys(result.current.data!)).toMatchInlineSnapshot(`
    [
      "gasPrice",
      "maxFeePerGas",
      "maxPriorityFeePerGas",
    ]
  `)
})
