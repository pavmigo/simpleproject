import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateScore extends Component {
    state = {
        score: '',
        scoreLane: ''
    }

    render(){
        return(
            <div>
                <div className = "Create Score">
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
                    palceholder = "Score Lane"
                    />
                </div>
                <button onClick = {() => this._createScore()}>Submit</button>

            </div>


        )

    }
    _createScore = async () =>{
        const {score, scoreLane} = this.state
        await this.props.mutation({
            variables: {
                score,
                scoreLane
            }
        })
        this.props.history.push('/')
    }
}

const POST_MUTATION = gql`
    mutation PostMutation($score: String!, $scoreLane: String!) {
        post(score: $score, scoreLane: $scoreLane){
            id
            score
            scoreLane
        }
    }
`
export default graphql(POST_MUTATION,{name: 'mutation'})(CreateScore)