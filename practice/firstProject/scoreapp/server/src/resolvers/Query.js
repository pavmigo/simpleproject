function points(parent, args, context, info){


    return context.db.query.scorePoints({},info)

}

function tournaments(parent, args, context, info){


    return context.db.query.tournaments({}, info)

}

function users(parent, args, context, info){

    
    return context.db.query.users({}, info)
}


module.exports = {
    points,
    tournaments,
    users,
}