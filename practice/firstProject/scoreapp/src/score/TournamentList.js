import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Tournament from './Tournament'

class TournamentList extends Component {
    componentDidMount() {
        this._subscribeToNewTournament()
    }

    render() {
        if(this.props.tourQuery && this.props.tourQuery.loading){
            return <div>Loading </div>
        }
        if(this.props.tourQuery && this.props.tourQuery.error){
            return <div>Error</div>
        }
        const tournamentsToRender = this.props.tourQuery.tournaments
        
        //console.log(this.props)

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
        this.props.tourQuery.subscribeToMore({
            document: gql`
            subscription{
                newTournament{
                  node{
                    id
                    name
                    location
                    score{
                      id
                      score
                      scoreLane
                    }
                  }
                }
              }
            `
            ,
            updateQuery: (previous, {subscriptionData}) => {
                const newAllTournament = [ ...previous.tournaments, subscriptionData.data.newTournament.node]

                const result = {
                    ...previous,
                    tournaments: newAllTournament
                }

                return result
            }
        })
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
export default graphql(tournament_query,{name: 'tourQuery'}) (TournamentList)
