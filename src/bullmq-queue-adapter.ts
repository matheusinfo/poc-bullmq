import { Processor, Queue, QueueEvents, Worker } from "bullmq"
import { reddisConnection } from "./config"

export class BullMqQueueAdapter {
  constructor(private readonly name: string) {}

  create(): Queue {
    return new Queue(this.name, reddisConnection)
  }

  events(): QueueEvents {
    return new QueueEvents(this.name, reddisConnection)
  }

  worker(callback: Processor<any, any, string>): Worker {
    return new Worker(this.name, callback, reddisConnection)
  }
}
