import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'



class Header extends Component {
  render() {
      const authToken = localStorage.getItem(AUTH_TOKEN)
    return(
    <div>
      <div>
        <div><h1>Score App</h1></div>
        <Link to="/">
          Main App
        </Link>
        | 
        <Link to="/createScore">
          Create Score
        </Link>
        | 
        <Link to="/createTournament">
          Create Tournament
        </Link>


          |
         {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN)
              this.props.history.push(`/`)
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
    )
  }
}

export default withRouter(Header)