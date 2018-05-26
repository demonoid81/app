import gql from 'graphql-tag'

export default {
    GET_TOKEN: gql`{loginToken}`,
    LOGIN_USER: gql`
    mutation UserToken($username: String!, $password: String!) {
        userToken(
            username: $username,
            password: $password
        )
    }
`

}
