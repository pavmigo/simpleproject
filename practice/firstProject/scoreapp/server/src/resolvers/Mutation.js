const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info){
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.db.mutation.createUser({
        data: {... args, password },
    }, `{id}`)
    const token = jwt.sign({userID: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info){
    const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)
  if (!user) {
    throw new Error('No such user found')
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}

async function vote(parent, args, context, info){
    const userId = getUserId(context)

    const voteExist = await context.db.exists.Vote({
        user: {id: userId },
        scorePoint: {id: args.scorePointID},

    })

    if (voteExist){
        throw new Error(`Already voted for Score: ${args.scorePointID}`)

    }

    return context.db.mutation.createVote({
        data: {
            user: {connect: {id: userId }},
            scorePoint: { connect: {id: args.scorePointID } },
        },

    },info,)
}

async function post(parent, args, context, info) {
    const userId = getUserId(context)
    context.db.mutation.updateUser({
        data: {
            tournaments: {connect: {id: args.tournamentId}}
        }
    })
    
    return context.db.mutation.createScorePoint(
      {
        data: {
          scoreLane: args.scoreLane,
          score: args.score,
          createdBy: {connect: {id: userId}},
          tournaments: {connect: {id: args.tournamentId}},
        },
      },
      info,
    )
  }

  async function createTournament(parent, args, context, info){
      const result = await context.db.mutation.createTournament(
          {
              data: {
                  name: args.name,
                  location: args.location
                  //Later add conections
              },
          },
          info,
      )

      console.log("Result: " ,result)
      return result
  } 


module.exports = {
    signup,
    login,
    post,
    vote,
    createTournament,
}