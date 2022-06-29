import { Queue } from "bullmq"

export const queueSimulate = (queue: Queue, times: number): void => {
  for (let queueTime = 0; queueTime < times; queueTime++) {
    const types = ["NFE", "PDF", "XML", "JPG"]
    const documentPosition = Math.floor(Math.random() *  5)
    queue.add("document", { type: types[documentPosition] })
  }
}
