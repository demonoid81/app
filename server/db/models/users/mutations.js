import types from '../../../graphql/types/index'
import {
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType
} from 'graphql'
import models from '../index'

import SHA3 from 'js-sha3'

const sha256 = SHA3.sha3_256

export const loginUsers = {
    description: 'Запрос на авторизацию пользователя',
    name: 'LoginUser',
    type: GraphQLString,
    args: {
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: await () => {
        return UserModel.findOne({username: args.username, password: pass}).then(data => {

        })
        //return sha256(Math.random().toString(36).substr(2, 36))
    }
}

export default {
    loginUsers: loginUsers
}
