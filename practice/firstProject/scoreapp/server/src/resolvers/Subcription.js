function newScorePointsSubscribe (parent, args, context, info) {
    return context.db.subscription.scorePoints(
        { where: { mutation_in: ['CREATED'] } },
        info,
    )
}

function newVoteSubscribe (parent, args, context, info){
    return context.db.subscription.vote(
        {where : {mutation_in: ['CREATED']}},
        info,
    )
}

const newVote = {
    subscribe: newVoteSubscribe
}

const newScorePoints = {
    subscribe: newScorePointsSubscribe
}

module.exports = {
    newScorePoints,
    newVote,
}
