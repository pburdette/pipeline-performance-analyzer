import { GraphQLClient } from 'graphql-request'

export const gitlabClient = (token) => {
  return new GraphQLClient('https://gitlab.com/api/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
