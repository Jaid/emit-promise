/** @module emit-promise */

import pTimeout from "p-timeout"
import ms from "ms.macro"

const emitPromise = (socket, ...payload) => new Promise((resolve, reject) => {
  try {
    socket.emit(...payload, response => {
      resolve(response)
    })
  } catch (error) {
    reject(error)
  }
})

/**
 * Emits an event to the socket and resolves the socket's answer in a Promise
 * @async
 * @function
 * @param {{emit: (eventName: string, payload: ...*, callback: * => void) => void}} socket Socket object with an `emit` function
 * @param {number|boolean} timeout Timeout in milliseconds, `true` for default value of 60 seconds, `false` to disable timeout and risk waiting forever
 * @param {...*} payload Things to send with the event
 * @returns {Promise<any>} Answer from socket
 * @example
 * import emitPromise from "emit-promise"
 * const status = await emitPromise(socketIoServerSocket, 15000, "getStatus")
 */
export default async (socket, timeout, ...payload) => {
  const promise = emitPromise(socket, ...payload)
  if (timeout === false) {
    return promise
  }
  const timeoutMs = timeout === true ? ms`60 seconds` : timeout
  return pTimeout(promise, timeoutMs)
}