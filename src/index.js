/** @module emit-promise */

/**
 * Emits an event to the socket and resolves the socket's answer in a Promise
 * @example
 * import emitPromise from "emit-promise"
 * const status = await emitPromise(socketIoServerSocket, "getStatus")
 * @param {object} socket Socket object with an `emit` function
 * @param {...payload} payload Things to send with the event
 * @returns {Promise<any>} Answer from socket
 */
export default (socket, ...payload) => new Promise((resolve, reject) => {
  try {
    socket.emit(...payload, response => {
      resolve(response)
    })
  } catch (error) {
    reject(error)
  }
})