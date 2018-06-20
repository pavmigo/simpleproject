/** @jsx h */
import { h } from 'preact'
import { Query, Mutation } from '../../src/index'

const TODOS = `
query {
  todos {
    id
    text
  }
}`

const USER = `
query {
  user {
    name
    age
  }
}`

const ADD_TODO = `
mutation($text: String!) {
  todos: addTodo(text: $text) {
    id
    text
  }
}`

const INCREMENT_USER_AGE = `
mutation($by: Int!) {
  user: incrementUserAge(by: $by) {
    name
    age
  }
}`

export default () => (
  <div>
    <Query query={TODOS} cacheKey='TODOS'>
      {({ data, loaded }) => (
        !loaded ? <p>Loading...</p>
          : (
            <div>
              <ul>
                {
                  data.todos.map(todo => (
                    <li>{todo.text}</li>
                  ))
                }
              </ul>
              <Mutation
                mutation={ADD_TODO}
                variables={{ text: 'Todo ' + Math.random() }}
                appendCache='TODOS'
              >
                {mutate => (
                  <button type='button' onClick={mutate}>Add Todo</button>
                )}
              </Mutation>
            </div>
          )
      )}
    </Query>
    <Query query={USER} cacheKey='USER'>
      {({ data, loading }) => (
        loading
          ? <p>Loading...</p>
          : (
            <div>
              <p>{data.user.name}: {data.user.age}</p>
              <Mutation
                mutation={INCREMENT_USER_AGE}
                variables={{ by: 1 }}
                updateCache='USER'
              >
                {mutate => (
                  <button type='button' onClick={mutate}>Increment age</button>
                )}
              </Mutation>
            </div>
          )
      )}
    </Query>
  </div>
)
