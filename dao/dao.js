const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('dao/db.json')
const db = low(adapter)

let moment = require('moment')
let hat = require('hat')
let _ = require('lodash')

let STATUSES = [
  'NEW',

  'BOOK_REGISTER',
  'BOOK_DEPOSIT',

  'QUALIFIER_PICK',
  'QUALIFIER_BOOK_VALIDATE',
  'QUALIFIER_MARKET_VALIDATE',
  'QUALIFIER_PICK_REVALIDATE',
  'QUALIFIER_MARKET_LIABILITY',
  'QUALIFIER_BOOK_PLACE',
  'QUALIFIER_MARKET_PLACE',

  'QUALIFIER_SETTLE_WAITING_BOOK',
  'QUALIFIER_SETTLE_WAITING_MARKET',

  'BOOK_VERIFY',

  'FOLLOW_PICK',
  'FOLLOW_BOOK_VALIDATE',
  'FOLLOW_MARKET_VALIDATE',
  'FOLLOW_PICK_REVALIDATE',
  'FOLLOW_BOOK_PLACE',
  'FOLLOW_MARKET_PLACE',

  'FOLLOW_SETTLE_WAITING_BOOK',
  'FOLLOW_SETTLE_WAITING_MARKET',

  'WITHDRAW_BOOK',
  'WITHDRAW_COMPLETE'
]

var init = exports.init = async function () {
  // Set some defaults (required if your JSON file is empty)
  await db.defaults({ sessions: [] })
    .write()
}

exports.getSessions = async function () {
  return db.get('sessions').value()
}

exports.newSession = async function () {
  console.log('Create a new session for today - start')
  let id = hat()
  let session = {
    id: id,
    email: process.env.PERSONAL_EMAIL.replace('(-)', id),
    betfredUsername: process.env.BETFRED_USERNAME.replace('(-)', id.substring(0, 8)),
    betfredPassword: 'Pas' + id.substring(0, 6),
    date: moment(),
    day: moment().format('LL'),
    status: 'NEW',
    qualifier: {},
    follow: {},
    balance: 0
  }
  await save(session)
  var fs = require('fs')
  var debug = './debug/' + id

  if (!fs.existsSync(debug)) {
    fs.mkdirSync(debug)
  }
  await statusComplete(session)
  console.log('Create a new session for today - end')
}

let statusComplete = exports.statusComplete = async function (session) {
  let i = _.indexOf(STATUSES, session.status)
  let newStatus = STATUSES[i + 1]
  session.status = newStatus
  await save(session)
}
let statusError = exports.statusError = async function (session) {
  session.status = session.status + '_ERROR'
  await save(session)
}

let save = exports.save = async function (session) {
  let existing = await db.get('sessions')
    .find({ id: session.id })
    .value()
  console.log('save: ', session.id, existing)
  if (existing === undefined) {
    // Insert
    console.log('save insert')
    await db.get('sessions')
      .push(session)
      .write()
  } else {
    // Update
    console.log('save update')
    await db.get('sessions')
      .find({ id: session.id })
      .assign(session)
      .write()
  }
}

init()
