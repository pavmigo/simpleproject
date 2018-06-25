function points(parent, args, context, info){
    return context.db.query.scorePoints({},info)

}

function tournaments(parent, args, context, info){
    return context.db.query.tournaments({}, info)

}

module.exports = {
    points,
    tournaments,
}