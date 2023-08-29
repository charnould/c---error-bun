import { serveStatic } from 'hono/bun'
import { Hono } from 'hono'
import { get, post } from './controller'

const app = new Hono()

app.use('/datastore/archives/*', serveStatic({ root: './' }))
app.use('/datastore/images/*', serveStatic({ root: './' }))

app.get('/', get)
app.post('/', post)

export default app
