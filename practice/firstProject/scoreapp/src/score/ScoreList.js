import React, { Component } from 'react'
import Score from './Score'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'



class ScoreList extends Component {
    componentDidMount() {
        this._subscribeToNewScore()
    }
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
        <div>
                {pointsToRender.map((score, index) => (
            <Score key={score.id} updateStoreAfterVote = {this._updateCacheAfterVote} index={index} score={score} />
        ))}
        </div>
        </div>
    )
    }
    _subscribeToNewScore = () => {
        this.props.query.subscribeToMore({
            document: gql`
            subscription{
                newScorePoints{
                  node{
                    id
                    scoreLane
                    score
                    createdBy{
                        id
                        name
                    }
                  }
                }
              }
            `
            ,
            updateQuery: (previous, {subscriptionData}) =>{
                /*
                console.log(previous)
                return Object.assign({}, previous, {
                    points: Object.assign({}, previous.points, {
                      points: [...previous.points, subscriptionData.data.newScorePoints],
                    })
                  });

                  */
                
                  //console.log(subscriptionData.data.newScorePoints)
                const newAllScore = [ ...previous.points, subscriptionData.data.newScorePoints.node]
                // console.log('newAllScore: ', newAllScore)
                //const result1 = previous.splice(0,0,subscriptionData.data.newScorePoints.node)

                // console.log('previous: ', previous)
                const result = {
                    ...previous,
                    points: newAllScore,
                }
                // console.log(result)

                //console.log(result)
                return result
                
            }
        })
    }

    _updateCacheAfterVote = (store, createVote, linkId) => {
        const data = store.readQuery({ query: point_query })
        
        store.writeQuery({query: point_query, data})
        
    }
}


  
export const point_query = gql`
    query{
        points{
            id
            scoreLane
            score
            createdBy{
                id
                name
            }
        }
    }
  `
export default graphql(point_query,{name: 'query'}) (ScoreList)