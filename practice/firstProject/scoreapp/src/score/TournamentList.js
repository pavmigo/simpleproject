import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Tournament from './Tournament'

class TournamentList extends Component {
    componentDidMount(){

    } 
    render(){
        if(this.props.query && this.props.query.loading){
            return <div>Loading </div>
        if(this.props.query && this.props.query.error){
            return <div>Error</div>
        }
        const tournamentsToRender = this.props.query.points

        }

        return(
            <div>
                <div><h3>Tournament List: </h3></div>
                <div>
                    {tournamentsToRender.map((tournament) => (
                        console.log("hello") //Here goes the torunament class
                    ))}
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
export default graphql(tournament_query,{name: 'query'}) (Tournament)
