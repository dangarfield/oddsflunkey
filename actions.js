let betfred = require('./page-controllers/book/betfred')
let skybet = require('./page-controllers/book/skybet')
let eightsport = require('./page-controllers/book/888sport')

exports.BOOK_REGISTER = async function (session, dao) {
  console.log('ACTION BOOK_REGISTER - START - ', session.id)
  let chainNextStep = true
  try {
    await eightsport.register(session)
    // dao.statusComplete(session)
    chainNextStep = false
  } catch (error) {
    console.error(error, session.id)
    await dao.statusError(session)
    chainNextStep = false
  }
  console.log('ACTION BOOK_REGISTER - END - ', session.id)
  return chainNextStep
}

exports.BOOK_DEPOSIT = async function (session, dao) {
  console.log('ACTION BOOK_DEPOSIT - START - ', session.id)
  let chainNextStep = false
  try {
    await eightsport.deposit(session)
    // dao.statusComplete(session)
  } catch (error) {
    console.error(error, session.id)
    await dao.statusError(session)
    chainNextStep = false
  }
  console.log('ACTION BOOK_DEPOSIT - END - ', session.id)
  return chainNextStep
}
