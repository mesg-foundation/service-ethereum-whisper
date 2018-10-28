import Service from "mesg-js/lib/service"
import config from "../../config.json"

export = async (mesg: Service, web3: any, symKeyID: string) => {
  web3.shh.subscribe("messages", {
    symKeyID: symKeyID,
    topics: [config.topic]
  })
  .on('data', (message: any) => {
    mesg.emitEvent('message', {
      ttl: message.ttl,
      timestamp: message.timestamp,
      topic: message.topic,
      payload: message.payload,
      padding: message.padding,
      pow: message.pow,
      hash: message.hash,
    })
  })
  .on('error', (error: any) => {
    console.error('error during subscribe', error)
    process.exit(1)
  })
}