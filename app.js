require('dotenv').config()
let _ = require('lodash')
let moment = require('moment')

let dao = require('./dao/dao')
let actions = require('./actions')

var init = async function () {
  console.log('Init started')

  // If applicable, create a new session
  console.log('Testing for a session for today', moment().format('LL'))
  if (_.filter(await dao.getSessions(), { 'day': moment().format('LL') }).length === 0) {
    await dao.newSession()
  }

  let sessions = await dao.getSessions()
  // console.log('sessions', sessions)
  // Resume active sessions
  _.forEach(sessions, async function (session) {
    let chainNextStep = false
    do {
      chainNextStep = await resumeSession(session)
    }
    while (chainNextStep)
  })
}

var resumeSession = async function (session) {
  session = await dao.getSession(session.id)
  console.log('resume session start', session.id, session.status)
  let chainNextStep = false
  switch (session.status) {
    case 'BOOK_REGISTER':
      console.log('BOOK_REGISTER')
      chainNextStep = await actions.BOOK_REGISTER(session, dao)
      break
    case 'BOOK_DEPOSIT':
      console.log('BOOK_DEPOSIT')
      chainNextStep = await actions.BOOK_DEPOSIT(session, dao)
      break
    default:
      console.error('Unknown status: ', session.status, session)
      break
  }
  return chainNextStep
}

init()
