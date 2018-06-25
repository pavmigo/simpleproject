import React, {Component } from 'react'

class Tournament extends Component {
    render(){
        return(
            <div>
                <div>
                    Tournament:
                        {this.props.tournament.name}||Location: {this.props.tournament.location}
                </div>
                <div>
                    Score of Tournament:
                    Implemented later
                </div>
            </div>
        )
    }
}

export default Tournament