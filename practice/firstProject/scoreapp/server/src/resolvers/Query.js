function points(parent, args, context, info){
    return context.db.query.scorePoints({},info)

}

module.exports = {
    points
}