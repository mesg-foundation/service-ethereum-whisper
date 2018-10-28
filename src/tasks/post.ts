import { TaskInputs, TaskOutputs } from "mesg-js/lib/service"
import config from "../../config.json"

const post = (web3: any, symKeyID: string) => async (inputs: TaskInputs, outputs: TaskOutputs): Promise<void> => {
  try {
    const hash = await web3.shh.post({
        symKeyID: symKeyID,
        ttl: config.ttl,
        topic: inputs.topic || config.topic,
        payload: inputs.payload,
        powTime: config.powTime,
        powTarget: config.powTarget
    })
    return outputs.success({ hash })
  }
  catch (error) {
    return outputs.error({ message: error.toString() })
  }
}
export default post