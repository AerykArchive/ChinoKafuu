const { MessageChannel } = require('worker_threads')
const { port1, port2 } = new MessageChannel()

module.exports = class ClusteringInterface {
  constructor (client) {
    this.client = client
    this.in = port1
    this.out = port2

    this.in.on('message', (m) => {
      if (m.result) return
      try {
        const z = eval(m)
        this.out.postMessage(z)
      } catch (e) {
        this.out.postMessage(e.stack)
      }
    })
  }

  handler (resolve, d) {
    if (!m.result) return
    resolve(d)
    this.in.removeListener('message', (m) => this.handler(resolve, m))
  }

  broadcastEval (code) {
    port2.postMessage({ code, sending: true })
    return new Promise((resolve) => {
      this.in.on('message', (m) => this.handler(resolve, m))
    })
  }

  get firstShardID () {
    if (process.env.CLUSTER_ID === '0') return 0
    return parseInt(process.env.CLUSTER_ID) * parseInt(process.env.SHARDS_PER_CLUSTER)
  }
}
