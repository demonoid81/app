import models from 'server/db/autoMigratons'

module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
            .then(() => {
                return queryInterface.createTable(models.Users.tableName, models.Users.attributes)
                // .then(() => queryInterface.createTable(models.Team.tableName, models.Team.attributes))
                // .then(() => queryInterface.createTable(models.User.tableName, models.User.attributes))
            }) 
    },

    down: function (queryInterface, Sequelize) {

    }
}
