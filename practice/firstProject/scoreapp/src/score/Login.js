import React, {Component}  from 'react'
import { AUTH_TOKEN } from '../constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends Component {
    state = {
        login: true,
        email: '',
        password: '',
        name: '',
    }

    render(){
        return (
            <div>
                <h4>{this.state.login ? 'Login' : 'Sign Up'}</h4>
                <div>
                    {!this.state.login && (
                        <input
                            value = {this.state.name}
                            onChange = {e => this.setState({name: e.target.value})}
                            type="text"
                            placeholder = "Name"
                        />

                    )}
                        <input 
                            value = {this.state.email}
                            onChange = {e => this.setState({email: e.target.value})}
                            type = "text"
                            placeholder = "Your email address"
                        />
                        <input
                            value = {this.state.password}
                            onChange = {e => this.setState({password: e.target.value})}
                            type = "password"
                            placeholder = "Choose a safe password"
                        />
                    </div>
                <div>
                    <div onClick= {() => this._confirm()}>
                        {this.state.login ? 'login':'create account'}
                    </div>
                    <div
                        onClick={() => this.setState({login: !this.state.login})}
                    >
                        {this.state.login
                        ? 'need to create an account'
                        : 'already have an account?'}
                    </div>
                </div>
            </div>
        )           
    }
    _confirm = async () => {
        //console.log(this.props)

        const {name, email, password} = this.state
        if (this.state.login){
            const result = await this.props.run({
                variables:{
                    email,
                    password,
                },
            })
            const {token} = result.data.login
            this._saveUserData(token)
        } else {
            const result = await this.props.singup({
                variables: {
                    name,
                    email,
                    password,
                },
            })
            //console.log(result)
            const { token } = result.data.signup
            this._saveUserData(token)
        }
        this.props.history.push('/')

    }
    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

const SIGNUP_MUTATION = gql`
mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default compose( 
    graphql(SIGNUP_MUTATION, { name: 'singup' }),
    graphql(LOGIN_MUTATION, { name: 'run' }),
) (Login)
