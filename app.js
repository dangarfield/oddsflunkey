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
  _.forEach(sessions, function (session) {
    resumeSession(session)
  })
}

var resumeSession = async function (session) {
  console.log('resume session start', session.id, session.status)
  switch (session.status) {
    case 'BOOK_REGISTER':
      console.log('BOOK_REGISTER')
      actions.BOOK_REGISTER(session, dao)
      break

    default:
      console.error('Unknown status: ', session.status, session)
      break
  }
}

init()
