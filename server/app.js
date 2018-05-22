import '../env'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import { SubscriptionServer } from 'subscriptions-transport-ws'
const koaPlayground = require('graphql-playground-middleware-koa').default
import { addMiddleware } from 'graphql-add-middleware'
import { execute, subscribe } from 'graphql'
const db = require('./db/models')

import GraphQLSchema from './graphql/shema'

const port = process.env.PORT
const app = new Koa()
const router = new KoaRouter()

app.use(async function (ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', function (err, ctx) {
    console.log('server error', err)
})

// // add middleware to ALL resolvers (also to nested resolver if they are defined in schema like Post.author)
// addMiddleware(GraphQLSchema, async function (root, args, context, info, next) {
//     // you can modify root, args, context, info
//     const result = await next()
//     console.log('calc: ' + result)
//     // you can modify result
//     return result // you must return value
// })

router.post('/graphql', koaBody(), graphqlKoa({
    schema: GraphQLSchema,
    pretty: process.env.NODE_ENV !== 'production',
    formatError: error => ({
        message: error.message,
        state: error.originalError && error.originalError.state,
        locations: error.locations,
        path: error.path
    }),
    // Отправим новый ключ для запроса
    extensions ({ document, variables, operationName, result }) {
        console.log('this: ' + result)
    }
}))

router.all('/playground', koaPlayground({
    endpoint: '/graphql'
}),
)

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port, () => {
    db.sequelize.sync()
    console.log(new Date() + ` Koa is listening in ${port}`)
    // const subscriptionsServer =
    // new SubscriptionServer({
    //     schema: GraphQLSchema,
    //     execute,
    //     subscribe
    //     // subscriptionManager: subscriptionManager,
    //     // onConnect: async (connectionParams) => {
    //     //     if (connectionParams.authToken) {
    //     //         return await validateToken(connectionParams.authToken)
    //     //     }
    //     //     throw new Error('Missing auth token!')
    //     // }
    // }, {
    //     path: '/subscriptions',
    //     server: app
    // }
    // )
})
