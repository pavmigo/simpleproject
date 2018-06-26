function newScorePointsSubscribe (parent, args, context, info) {
    return context.db.subscription.scorePoint(
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

function newTournamentSubscribe (parent, args, context, info){
    return context.db.subscription.tournament(
        {where: {mutation_in: ['CREATED']}},
        info,
    )
}

const newVote = {
    subscribe: newVoteSubscribe
}

const newScorePoints = {
    subscribe: newScorePointsSubscribe
}

const newTournament = {
    subscribe: newTournamentSubscribe
}

module.exports = {
    newScorePoints,
    newVote,
    newTournament,
}
