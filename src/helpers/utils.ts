import { PublicKey } from '@solana/web3.js'

/**
 * Delay by async/await
 * @param ms - milisenconds
 * @returns
 */
export const asyncWait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Validate Desig address
 * @param address Desig address
 * @returns true/false
 */
export const isAddress = (
  address: string | undefined | null,
): address is string => {
  if (!address) return false
  try {
    new PublicKey(address)
    return true
  } catch (er) {
    return false
  }
}

/**
 * Shorten a long address
 * @param address - The long address
 * @param num - The number of the heading and trailing characters
 * @param delimiter - The delimiter
 * @returns Shortened address
 */
export const shortenAddress = (address: string, num = 4, delimiter = '...') => {
  return (
    address.substring(0, num) +
    delimiter +
    address.substring(address.length - num, address.length)
  )
}
