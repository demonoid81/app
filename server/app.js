import '../env'
const Koa = require('koa')
const koaRouter = require( 'koa-router')
const koaBody  = require('koa-bodyparser')
const { graphqlKoa } = require('apollo-server-koa')
const playground = require('graphql-playground-middleware-koa').default
const graphqlAddMiddleware = require("graphql-add-middleware")
const db = require('./db/models')

const GraphQLSchema  = require('./db/shema')

let port = process.env.PORT
const app = new Koa()
const router = new koaRouter()

// Безопасность для GraphQL
graphqlAddMiddleware.addMiddleware()


router.all('/graphql', graphqlKoa({
    schema: GraphQLSchema,
    pretty: process.env.NODE_ENV !== 'production',
    formatError: (error) => {
        errors.report(error.originalError || error)
        return {
            message: error.message,
            code: error.originalError && error.originalError.code,
            state: error.originalError && error.originalError.state,
            locations: error.locations,
            path: error.path,
        }
    },
    // Отправим новый ключ для запроса
    // extensions({ document, variables, operationName, result }) {
    //     return { key:
    //     }
    // }
}))

router.all('/playground', playground({ endpointUrl: '/graphql' }))



app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())
export default app.listen(port, () => {
    db.sequelize.sync()
    console.log(`Koa is listening in ${port}`)
})
