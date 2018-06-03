
const config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
process.traceDeprecation = true

const opn = require('opn')
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const http = require('http')
const https = require('https')
const serve = require('koa-static')
const enforceHttps = require('koa-sslify')
const webpack = require('webpack')
const proxyMiddleware = require('koa-proxies')

const webpackConfig = require('./webpack.dev.config')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = new Koa()
const compiler = webpack(webpackConfig)
// Force HTTPS on all page
app.use(enforceHttps({
    trustProtoHeader: true,
    redirectMethods: ['GET', 'HEAD', 'POST'],
    port: 8989,
    skipDefaultPort: false
}))

const devMiddleware = require('./koaDevMiddleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: false,
    stats: {
        colors: true
    },
    noInfo: false
})

const hotMiddleware = require('./koaHotMiddleware')(compiler, {
    log: () => {}
})

// force page reload when html-webpack-plugin template changes
compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {
    hotMiddleware.publish({ action: 'reload' })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('koa2-connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(serve(staticPath))

const uri = 'http://localhost:' + port

let _resolve
const readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

// SSL options
const options = {
    key: fs.readFileSync('./ssl/app.key'),
    cert: fs.readFileSync('./ssl/app.crt')
}

http.createServer(app.callback()).listen(8080)
https.createServer(options, app.callback()).listen(port)

module.exports = {
    ready: readyPromise,
    // close: () => {
    //     server.close()
    // }
}
