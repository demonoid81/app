
import {
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType
} from 'graphql'
const db = require('../../db/models')

import SHA3 from 'js-sha3'

const sha256 = SHA3.sha3_256
const sha512 = SHA3.sha3_512

export const userToken = {
    description: 'Запрос на авторизацию пользователя',
    name: 'UserToken',
    type: GraphQLString,
    args: {
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve (root, args, options) {
        return db.Users.findAll()
            .then(data => {
                // todo разобрать с аутентификацией
                return sha512('p@sSw0rD')
            })
    }
    // return sha256(Math.random().toString(36).substr(2, 36))
}

module.export = {
    userToken: userToken
}
