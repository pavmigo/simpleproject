function points(parent, args, context, info){


    return context.db.query.scorePoints({},info)

}

function tournaments(parent, args, context, info){


    return context.db.query.tournaments({}, info)

}

function users(parent, args, context, info){


    return context.db.query.users({}, info)
}


function managers(parent, args, context, info){

    return context.db.query.managers({}, info)

}

function player(parent, args, context, info){

    return context.db.query.player({}, info)
    
}

module.exports = {
    points,
    tournaments,
    users,
}