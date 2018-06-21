function points(parent, args, context, info){
    return context.db.query.ScorePoints({},info)

}

module.exports = {
    points
}