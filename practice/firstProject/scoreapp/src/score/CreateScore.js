import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {point_query} from './ScoreList'
import {tournament_query} from './TournamentList'


class CreateScore extends Component {
    state = {
        score: '',
        scoreLane: '',
        tournamentId: ''
    }

    render(){
        if(this.props.query && this.props.query.loading){
            return <div>Loading </div>
        }
        if(this.props.query && this.props.query.error){
            return <div>Error</div>
        }
        const tournamentsToRender = this.props.query.tournaments

        return(
            <div>
                <div className = "CreateScore">
                    Score: 
                    <input
                    className="createScore"
                    value = {this.state.score}
                    onChange = { e => this.setState({score: e.target.value})}
                    type = "text"
                    placeholder = "A score"
                    />
                    Location: 
                    <input
                    className = "createScore"
                    value = {this.state.scoreLane}
                    onChange= {e => this.setState({scoreLane: e.target.value})}
                    type = "text"
                    placeholder = "Score Lane"
                    />
                </div>
                <div>Select Tournament
                    <select onChange = {e => this.setState({tournamentId: e.target.value})}>
                        <option ></option>
                        { tournamentsToRender.map((tournament) => (
                            <option value = {tournament.id} >{tournament.name}</option>
                        ))
                        }

                    </select>
                </div>
                <button onClick = {() => this._createScore()}>Submit</button>

            </div>


        )

    }
    _createScore = async () =>{
        const {score, scoreLane, tournamentId} = this.state
        console.log(this.state.tournamentId)
        console.log(tournamentId)
        await this.props.mutation({
            variables: {
                score,
                scoreLane,
                tournamentId
            },
            update: (store, {data: {post}}) => {
                //console.log(store)
                const data = store.readQuery({ query: point_query})
                data.points.splice(0,0, post)
                store.writeQuery({
                    query: point_query,
                    data,
                })
            }
        })
        this.props.history.push('/')
    }
}

const POST_MUTATION = gql`
    mutation PostMutation($score: String!, $scoreLane: String!, $tournamentId: String!) {
        post(score: $score, scoreLane: $scoreLane, tournamentId : $tournamentId){
            id
            score
            scoreLane
            createdBy{
                name
            }
        }
    }
`


export default compose( graphql(POST_MUTATION,{name: 'mutation'}),
    graphql(tournament_query,{name: 'query'})) (CreateScore)