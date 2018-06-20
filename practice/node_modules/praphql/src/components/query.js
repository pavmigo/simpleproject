import { Component } from 'preact'

// TODO: If key is updated, remove/add listener

export default class Query extends Component {
  constructor () {
    super()
    this.state = {
      loading: false,
      loaded: false,
      data: null
    }
  }

  componentWillMount () {
    const { query, variables, cacheKey } = this.props
    const { client } = this.context

    if (query && client) {
      this.setState({ loading: true })

      client.query(query, variables, cacheKey)
        .then(data => {
          this.setState({ data, loading: false, loaded: true })
        })
    }

    if (cacheKey && client) {
      client.listenTo(cacheKey, data => {
        this.setState({ data })
      })
    }
  }

  render ({ children }, state) {
    return children[0](state)
  }
}
