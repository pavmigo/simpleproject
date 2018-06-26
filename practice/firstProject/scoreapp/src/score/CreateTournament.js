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
        await this.props.mutation({
            variables: {
                name,
                location
            },
            update: (store, {data: {post}}) => {
                const data = store.readQuery({query: tournament_query })
                data.points.splice(0,0, post)
                store.writeQuery({
                    query: tournament_query,
                    data
                })
            }
        })
        this.props.history.push('/')
    }

}


const createTor_mutation = gql`
    mutation CreateMutation($name: String!, $location: String!){
        createTournament(name: $name, location: $location){
            id
            location
            name
        }
    }
`

export default graphql(createTor_mutation, {name: 'mutation'}) (CreateTournament)