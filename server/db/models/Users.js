module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        uuid: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: sequelize.literal('uuid_generate_v4()')
        },
        username: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {})
    Users.associate = function (models) {
        // associations can be defined here
    }
    return Users
}
