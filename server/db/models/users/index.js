module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.literal('uuid_generate_v4()')
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
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
