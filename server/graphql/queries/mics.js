import types from '../types/'
import {
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType
} from 'graphql'

import SHA3 from 'js-sha3'

const sha256 = SHA3.sha3_256

export const loginToken = {
    description: 'Запрос токена для залогинивания пользователя',
    name: 'LoginToken',
    type: GraphQLString,
    resolve: () => {
        return sha256(Math.random().toString(36).substr(2, 36))
    }
}

export default {
    loginToken: loginToken
}
