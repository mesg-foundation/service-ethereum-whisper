import { service as MESG } from "mesg-js"
import Web3 from "web3"
import config from "../config.json"
import messageEvent from "./events/message"
import post from "./tasks/post"

const main = async () => {
  const mesg = MESG()
  const web3: any = new Web3(config.endpoint)

  const symKeyID: string = await web3.shh.newSymKey()
  // console.log('symKeyID', symKeyID)
  
  mesg.listenTask({
    post: post(web3, symKeyID)
  })
  .on('error', console.error)

  messageEvent(mesg, web3, symKeyID)
  console.log('Service is ready')
}

try {
  main()
  .catch(error => {
    console.log('catch promise', error)
  })
} catch (error) {
  console.log('catch try', error)
}
