/** @module emit-promise */

import pTimeout from "p-timeout"

/**
 * Emits an event to the socket and resolves the socket's answer in a Promise
 * @example
 * import emitPromise from "emit-promise"
 * const status = await emitPromise(socketIoServerSocket, "getStatus")
 * @param {object} socket Socket object with an `emit` function
 * @param {...payload} payload Things to send with the event
 * @returns {Promise<any>} Answer from socket
 */
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
 * @param {object} socket Socket object with an `emit` function
 * @param {number} timeout Timeout in milliseconds
 * @param {...payload} payload Things to send with the event
 * @returns {Promise<any>} Answer from socket
 * @example
 * import emitPromise from "emit-promise"
 * const status = await emitPromise.withTimeout(socketIoServerSocket, 15000, "getStatus")
 */
export const emitTimeout = async (socket, timeout, ...payload) => {
  return pTimeout(emitPromise(socket, ...payload), timeout)
}

export default emitPromise