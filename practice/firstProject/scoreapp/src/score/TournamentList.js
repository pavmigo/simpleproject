import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Tournament from './Tournament'

class TournamentList extends Component {
    componentDidMount() {
        this._subscribeToNewTournament()
        this._subscribeToNewScore()
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
                    name
                    location
                    score{
                      id
                      score
                      scoreLane
                      createdBy{
                        id
                        name
                      }
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

    _subscribeToNewScore = () => {
        this.props.tourQuery.subscribeToMore({
            document: gql`
            subscription{
                newScorePoints{
                  node{
                    id
                    tournaments{
                      id
                      name
                      location
                      score{
                        score
                        scoreLane
                        createdBy{
                          id
                          name
                        }
                      }
                    }
                  }
                }
              }
            `,

        })

    }



}

export const tournament_query = gql`
    query{
        tournaments{
            id
            name
            location
            score{
                score
                scoreLane
                createdBy{
                    name
                }
            }
        }
    }
    `
export default graphql(tournament_query,{name: 'tourQuery'}) (TournamentList)
