import { BullMqQueueAdapter } from "./bullmq-queue-adapter"
import { documentEvents } from "./document-events"
import { queueSimulate } from "./queue-simulate"

const bullMqQueueAdapter = new BullMqQueueAdapter("Documents")
const queue = bullMqQueueAdapter.create()
const queueEvents = bullMqQueueAdapter.events()

queueSimulate(queue, 100)

queueEvents.on("completed", ({ jobId }) => {
  console.log(`Event of ${jobId} completed!`)
})

queueEvents.on("failed", ({ jobId, failedReason }) => {
  console.log(`Error on document ${jobId}, ${failedReason}.`)
})

bullMqQueueAdapter.worker(async (job) => {
  if (job.name === "document") {
    const documentType = job.data.type.toUpperCase()
    console.log(documentEvents[documentType])
  }
})
