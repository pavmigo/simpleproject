import { Component } from 'preact'

export default class Mutation extends Component {
  constructor () {
    super()
    this.state = {
      loading: false,
      loaded: false,
      data: null
    }
    this._mutate = this.mutate.bind(this)
  }

  mutate () {
    const { mutation, variables, updateCache, appendCache } = this.props
    const { client } = this.context

    if (mutation && client) {
      this.setState({ loading: true })

      client.mutate(mutation, variables, { updateCache, appendCache })
        .then(data => {
          this.setState({ data, loading: false, loaded: true })
        })
    }
  }

  render ({ children }, state) {
    return children[0](this._mutate, state)
  }
}
