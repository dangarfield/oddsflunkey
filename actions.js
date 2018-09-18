let betfred = require('./page-controllers/book/betfred')

exports.BOOK_REGISTER = async function (session, dao) {
  console.log('ACTION BOOK_REGISTER - START - ', session.id)
  try {
    await betfred.register(session)
    // dao.statusComplete(session)
  } catch (error) {
    console.error(error, session.id)
    await dao.statusError(session)
  }
  console.log('ACTION BOOK_REGISTER - END - ', session.id)
}
