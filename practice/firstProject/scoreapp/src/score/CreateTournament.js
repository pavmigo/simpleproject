import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {tournament_query} from './TournamentList'

class CreateTournament extends Component {
    state = {
        name: '',
        location: '',
    }

    render(){
        
        return(
            <div>
                <div className = "CreateTournament">
                    Tournament Name: 
                    <input
                    className = "createTournament"
                    value = {this.state.name}
                    onChange = { e => this.setState({name: e.target.value})}
                    type = "text"
                    placeholder = "Name of Tournament"
                    />
                </div>
                <div className = "CreateTournament">
                    Location: 
                    <input
                    className = "createTournament"
                    value = {this.state.location}
                    onChange = { e => this.setState({location: e.target.value})}
                    type = "text"
                    placeholder = "Name of Tournament"
                    />
                </div>
                <button onClick = {() => this._createTournament()}>Submit</button>
            </div>

    
        )
    }
    _createTournament = async () =>{
        const{name, location} = this.state
        await this.props.tour_mutation({
            variables: {
                name,
                location
            },
            update: (store, {data: {createTournament}}) => {
                //console.log(store)
                const data = store.readQuery({query: tournament_query })
                console.log(data)

                data.tournaments.splice(0,0, createTournament)
                //console.log(post)
                //console.log(store)
                store.writeQuery({
                    query: tournament_query,
                    data,
                })
            }
        })
        this.props.history.push('/tournamentList')
    }

}


const createTor_mutation = gql`
    mutation CreateMutation($name: String!, $location: String!){
        createTournament(name: $name, location: $location){
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

export default graphql(createTor_mutation, {name: 'tour_mutation'}) (CreateTournament)