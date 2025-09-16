import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { z } from "zod"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"

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

  return reply.status(201).send()
})

app.listen({ host: "0.0.0.0", port: PORT }).then(() => {
  console.log(`✅ [Orders] HTTP Server running at http://localhost:${PORT}`)
})
