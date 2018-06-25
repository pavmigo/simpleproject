import React, { Component } from 'react'
import ScoreList from './ScoreList'
import CreateScore from './CreateScore'
import Login from './Login'
import Header from './Header'
import CreateTournament from './CreateTournament'
import TournamentList from './TournamentList'

import { Switch, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/login" component = {Login} />
            <Route exact path="/" component={ScoreList} />
            <Route exact path="/createScore" component={CreateScore} />
            <Route exact path="/createTournament" component = {CreateTournament} />
            <Route exact path="/tournamentList" component = {TournamentList} />

          </Switch>
        </div>
      </div>
    )
  }
}

export default App