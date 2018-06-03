const PassThrough = require('stream').PassThrough

module.exports = (compiler, opts) => {
    const expressMiddleware = require('webpack-hot-middleware')(compiler, opts)
    return async (ctx, next) => {
        const stream = new PassThrough()
        ctx.body = stream
        await expressMiddleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (status, headers) => {
                ctx.status = status
                ctx.set(headers)
            }
        }, next)
    }
}
