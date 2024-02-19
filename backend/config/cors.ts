import { defineConfig } from '@adonisjs/cors'

const corsConfig = defineConfig({
  enabled: true,
  origin: ['http://localhost:8001'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
