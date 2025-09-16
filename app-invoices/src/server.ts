import './broker/subscriber.ts'

import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"

const PORT = 3334

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

app.listen({ host: "0.0.0.0", port: PORT }).then(() => {
  console.log(`✅ [Invoices] HTTP Server running at http://localhost:${PORT}`)
})
