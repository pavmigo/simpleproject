import React, {Component } from 'react'

class Tournament extends Component {
    render(){
        return(
            <div>
                <div>
                    Tournament: 
                        {this.props.tournament.name} | | Location: {this.props.tournament.location}
                        
                </div>
                <div>
                    Score of Tournament:
                    {this.props.tournament.score.map((score) => (
                        <div key = {score.id} >
                        Score: {score.score} in lane {score.scoreLane} by {score.createdBy.name}
                        </div>
                    ))
                    }
                </div>
            </div>
        )
    }
}

export default Tournament