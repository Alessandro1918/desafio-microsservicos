import "@opentelemetry/auto-instrumentations-node/register"

import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { z } from "zod"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { randomUUID } from "node:crypto"
import { db } from "./db/client.ts"
import { schema } from "./db/schema/index.ts"

// import { channels } from "./broker/channels/index.ts"
import { dispatchOrderCreated } from "./broker/messages/order-created.ts"

import { trace } from "@opentelemetry/api"
import { tracer } from './tracer/tracer.ts'
import { setTimeout } from "node:timers/promises"

const PORT = 3333

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, { origin: "*" })

app.get("/", () => {
  return "Hello, world!"
})

app.get("/health", () => {
  return "OK"
})

app.post("/orders", {
  schema: {
    body: z.object({
      amount: z.coerce.number(),
    })
  }
}, async (request, reply) => {
  const { amount } = request.body

  console.log("Creating an order with amount", amount)

  const orderId = randomUUID()
  const customerId = "B9176D35-7276-4255-A323-D825CAEE03B5"

  await db.insert(schema.orders).values({
    id: orderId,
    customerId: "B9176D35-7276-4255-A323-D825CAEE03B5",
    amount,
  })

  // Add data to trace:
  trace.getActiveSpan()?.setAttribute("order_id", orderId)

  // Add entire process to trace:
  const span = tracer.startSpan("possible-problematic-process")
  span.setAttribute("teste", "Hello World")
  await setTimeout(250)
  span.end()

  // Send message:
  // channels.orders.sendToQueue("orders", Buffer.from("Hello, world!"))
  dispatchOrderCreated({
    orderId,
    amount,
    customer: {
      id: customerId,
    },    
  })

  return reply.status(201).send()
})

app.listen({ host: "0.0.0.0", port: PORT }).then(() => {
  console.log(`✅ [Orders] HTTP Server running at http://localhost:${PORT}`)
})
