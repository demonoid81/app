import { GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql'
import Queries from './queries'

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: Queries
    })
    // mutation: new GraphQLObjectType({
    //     name: 'Mutation',
    //     fields: mutations
    // }),
    // subscription: new GraphQLObjectType({
    //     name: 'Subscriptions',
    //     fields: subscriptions
    // })

})
