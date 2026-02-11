import { gql } from '@apollo/client'

export const GET_HABITS_QUERY = gql`
query GetHabits {
    habits {
      id
      title
      description
      streak
      frequency
      completed
      category
      createdAt
    }
  }
 `

export const CREATE_HABIT_MUTATION = gql`
  mutation CreateHabit($input: CreateHabitInput!) {
    createHabit(input: $input) {
      id
      title
      description
      streak
      frequency
      completed
      category
    }
  }
`

export const UPDATE_HABIT_MUTATION = gql`
  mutation UpdateHabit($id: ID!, $input: UpdateHabitInput!) {
    updateHabit(id: $id, input: $input) {
      id
      title
      description
      streak
      frequency
      completed
      category
    }
  }
`

export const DELETE_HABIT_MUTATION = gql`
  mutation DeleteHabit($id: ID!) {
    deleteHabit(id: $id)
  }
`