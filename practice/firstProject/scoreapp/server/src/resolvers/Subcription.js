function newScorePointsSubscribe (parent, args, context, info) {
    return context.db.subcription.ScorePoints(
        { where: { mutation_in: ['CREATED'] } },
        info,
    )
}

const newScorePoints = {
    subscribe: newScorePointsSubscribe
}

module.exports = {
    newScorePoints,
}