import React, { Component } from 'react'

class Score extends Component {
    render(){
        //console.log(this.props)

        return (
            <div>
                <div>
                    Points: 
                    {this.props.score.score} in {this.props.score.scoreLane}
                </div>
            </div>
        )
    }

    _voteForScore = async () => {

    }
}

export default Score