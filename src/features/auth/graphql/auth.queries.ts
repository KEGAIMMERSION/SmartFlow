import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        name
        subscription
        avatar
      }
      token
    }
  }`

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        email
        name
        subscription
        avatar
      }
      token
    }
  }
`

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    me {
      id
      email
      name
      subscription
      avatar
    }
  }
`