import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Tournament from './Tournament'

class TournamentList extends Component {

    render() {
        if(this.props.query && this.props.query.loading){
            return <div>Loading </div>
        }
        if(this.props.query && this.props.query.error){
            return <div>Error</div>
        }
        const tournamentsToRender = this.props.query.tournaments
        
        console.log(this.props)

        return(
            <div>
                <div><h3>Tournament List: </h3></div>
                <div>
                    {tournamentsToRender.map((tournament) => (
                        <Tournament key = {tournament.id} tournament = {tournament} />
                    ))
                    }
                </div>
            </div>
        )
    }

    _subscribeToNewTournament = () =>{
    }



}

export const tournament_query = gql`
    query{
        tournaments{
            id
            name
            location
        }
    }
    `
export default graphql(tournament_query,{name: 'query'}) (TournamentList)
