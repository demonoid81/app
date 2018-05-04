import '../env'
const Koa = require('koa')
const koaRouter = require( 'koa-router')
const koaBody  = require('koa-bodyparser')
const { graphqlKoa } = require('apollo-server-koa')
const playground = require('graphql-playground-middleware-koa').default

let port = process.env.PORT
const app = new Koa()
const router = new koaRouter()

app.use(koaBody())

router.all('/graphql', graphqlKoa({ schema: myGraphQLSchema }))

app.use(router.routes())
app.use(router.allowedMethods())
export default app.listen(port, () => {
    console.log(`Koa is listening in ${port}`)
})
