import React, { Component } from 'react'
import Score from './Score'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class ScoreList extends Component {
    render() {
        if(this.props.query && this.props.query.loading){
            return <div>Loading</div>
        }

        if (this.props.query && this.props.query.error){
            return <div>Error</div>
        }
        
        //console.log(this.props)
        const pointsToRender = this.props.query.points

    return(<div>
        <div><h3>Score List: </h3></div>
        <div>{pointsToRender.map(score => <Score key = {score.id} score = {score} />)} </div>
        </div>
    )
    }
}

const point_query = gql`
    query{
        points{
            id
            scoreLane
            score
        }
    }
  `
export default graphql(point_query,{name: 'query'}) (ScoreList)