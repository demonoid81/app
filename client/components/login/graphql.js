import gql from 'graphql-tag'

export default {
    GET_TOKEN: gql`{loginToken}`,
    LOGIN_USER: gql`
    mutation LoginUser($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        )
    }
`

}
