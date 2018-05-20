const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/../config.json`)[env]
const db = {}
const users = require('./users')

let sequelize
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
}

db.sequelize = sequelize
db.Sequelize = Sequelize
db.users = users

module.exports = db
