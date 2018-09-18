const puppeteer = require('puppeteer')
const _ = require('lodash')

let page

var init = async function () {
  if (!page) {
    console.log('betfred - init - start')
    let path = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    const browser = await puppeteer.launch({headless: false, executablePath: path})
    // const browser = await puppeteer.launch({headless: false})
    page = await browser.newPage()
    console.log('betfred - init - end')
  }
}

var registerV1 = async function (session) {
  console.log('betfred - register v1 - start')

  // http://promotions.betfred.com/n/ppc/sports/football/2018-Season/bet-10-get-30/?siteid=14123&gclid=EAIaIQobChMIhsf4gOPE3QIVqrftCh1nywCAEAAYASAAEgJe3_D_BwE
  // https://www.betfred.com/account/registration?promo=PPC30&mred=https://betfred.mobi/register?promo=MPPC30

  // await page.goto('https://www.betfred.com/account/registration?promo=PPC30&mred=https://betfred.mobi/register?promo=MPPC30')
  await page.goto('https://betfred.mobi/register/account', {waitUntil: 'networkidle2'})
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-01.png', fullPage: true})

  // PAGE 1 - Account

  console.log('type username', session.betfredUsername)
  await page.waitForSelector('#username')
  await page.type('#username', session.betfredUsername)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-02.png', fullPage: true})

  console.log('type username', session.betfredPassword)
  await page.type('#password', session.betfredPassword)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-03.png', fullPage: true})

  console.log('click terms')
  await page.evaluate(() => {
    document.querySelector('.registration-form__checkbox').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-04.png', fullPage: true})

  console.log('click next')
  await page.evaluate(() => {
    document.querySelector('.registration-continue__button').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-05.png', fullPage: true})

  // PAGE 2 - Personal

  console.log('type firstname', process.env.PERSONAL_NAME_FIRST)
  await page.waitForSelector('#firstname')
  await page.type('#firstname', process.env.PERSONAL_NAME_FIRST)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-06.png', fullPage: true})

  console.log('type lastname', process.env.PERSONAL_NAME_LAST)
  await page.type('#lastname', process.env.PERSONAL_NAME_LAST)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-07.png', fullPage: true})

  console.log('type dob', process.env.PERSONAL_NAME_LAST)
  await page.type('#DAY', process.env.PERSONAL_DOB_DAY)
  await page.type('#MONTH', process.env.PERSONAL_DOB_MONTH)
  await page.type('#YEAR', process.env.PERSONAL_DOB_YEAR)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-08.png', fullPage: true})

  console.log('click next')
  await page.evaluate(() => {
    document.querySelector('.registration-continue__button').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-09.png', fullPage: true})

  // PAGE 3 - Contact

  console.log('type email', session.email.replace('+', ''), 'Note: Plus removed, have to add it back in later')
  await page.waitForSelector('#email')
  await page.type('#email', session.email.replace('+', ''))
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-10.png', fullPage: true})

  console.log('type telephone', process.env.PERSONAL_PHONE)
  await page.type('#telephone', process.env.PERSONAL_PHONE)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-11.png', fullPage: true})

  console.log('select security question')
  await page.evaluate(() => {
    document.querySelector('#securityQuestion').click()
  })
  await page.evaluate(() => {
    document.querySelector('.picker__list li').click()
  })
  await page.evaluate(() => {
    document.querySelector('.registration-modal__footer a').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-12.png', fullPage: true})

  console.log('type security answer', process.env.PERSONAL_MOTHER)
  await page.type('#securityAnswer', process.env.PERSONAL_MOTHER)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-13.png', fullPage: true})

  console.log('click next')
  await page.evaluate(() => {
    document.querySelector('.registration-form__label').click()
    document.querySelector('.registration-continue__button').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-14.png', fullPage: true})

  // PAGE 4 - Address

  console.log('type postcode', process.env.PERSONAL_ADDRESS_POSTCODE)
  await page.waitForSelector('#postcodeSearch')
  await page.type('#postcodeSearch', process.env.PERSONAL_ADDRESS_POSTCODE)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-15.png', fullPage: true})

  console.log('click outside uk')
  await page.evaluate(() => {
    document.querySelector('.registration-form__address-option-link').click()
  })

  console.log('type address', process.env.PERSONAL_ADDRESS_POSTCODE)
  await page.waitForSelector('#address1')
  await page.type('#address1', process.env.PERSONAL_ADDRESS_NUMBER + ' ' + process.env.PERSONAL_ADDRESS_ROAD)
  await page.type('#county', process.env.PERSONAL_ADDRESS_TOWN)
  await page.type('#postcode', '')
  await page.type('#county', '')
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-16.png', fullPage: true})

  console.log('choose country')
  await page.evaluate(() => {
    document.querySelector('#postcode').click()
    document.querySelector('#county').click()
    document.querySelector('.registration-form__label').click()
    document.querySelector('.registration-form__input--country').click()
    document.querySelector('#country').click() // first is uk
    document.querySelector('.registration-modal__footer a').click()
  })
  // await page.screenshot({path: 'debug/' + session.id + '/betfred-register-17.png', fullPage: true})

  console.log('click next')
  await page.evaluate(() => {
    document.querySelector('.registration-form__label').click()
    document.querySelector('.registration-continue__button').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-18.png', fullPage: true})

  // PAGE 5 - Settings

  console.log('set marketing')
  await page.waitForSelector('.marketing-preference__unsubscribe-to-all-container')
  await page.evaluate(() => {
    document.querySelectorAll('.marketing-preference__unsubscribe-to-all-container input')[0].click()
    document.querySelectorAll('.marketing-preference__unsubscribe-to-all-container input')[1].click()
    document.querySelector('.add-a-promo-code-container button').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-19.png', fullPage: true})

  console.log('add promo code')
  await page.type('#promocode', process.env.BETFRED_PROMO)
  await page.evaluate(() => {
    document.querySelector('.promotion-code__label').click()
    document.querySelector('.promotion-code-page__add-button--default').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-20.png', fullPage: true})

  console.log('click next')
  await sleep(2)
  await page.evaluate(() => {
    document.querySelector('.registration-register__button').click()
    document.querySelector('.registration-register__button').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-21.png', fullPage: true})

  console.log('betfred - register v1 - end')
}
var sleep = async function (s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000))
}
var registerV2 = async function (session) {
  console.log('betfred - register v2 - start')

  // http://promotions.betfred.com/n/ppc/sports/football/2018-Season/bet-10-get-30/?siteid=14123&gclid=EAIaIQobChMIhsf4gOPE3QIVqrftCh1nywCAEAAYASAAEgJe3_D_BwE
  // https://www.betfred.com/account/registration?promo=PPC30&mred=https://betfred.mobi/register?promo=MPPC30

  // Page 1 - Go through proxy

  // await page.goto('https://www.betfred.com/account/registration?promo=PPC30&mred=https://betfred.mobi/register?promo=MPPC30')
  // await sleep(2)

  await page.goto('https://hide.me/en/proxy')
  console.log('type url', 'https://www.betfred.com/account/registration?promo=PPC30&mred=https://betfred.mobi/register?promo=MPPC30')
  await page.type('#u', 'https://www.betfred.com/account/registration?promo=PPC30&mred=https://betfred.mobi/register?promo=MPPC30')
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-01.png', fullPage: true})

  console.log('click visit')
  await page.evaluate(() => {
    document.querySelector('#hide_register_save').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-02.png', fullPage: true})

  // Page 2 - Enter Registration Data
  await page.type('#Forename', process.env.PERSONAL_NAME_FIRST)
  await page.type('#Surname', process.env.PERSONAL_NAME_LAST)
  await page.type('#EmailAddress', session.email)
  await page.type('#PhoneNumber', '0' + process.env.PERSONAL_PHONE)
  await page.type('#PostCode1', process.env.PERSONAL_ADDRESS_POSTCODE)
  await page.type('#UserName', session.betfredUsername)
  await page.type('#Password', session.betfredPassword)
  await page.type('#SecurityAnswer', process.env.PERSONAL_MOTHER)
  await page.type('#PromoCode', process.env.BETFRED_PROMO)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-03.png', fullPage: true})

  await sleep(5)
  let dobDay = parseInt(process.env.PERSONAL_DOB_DAY)
  let dobMonth = parseInt(process.env.PERSONAL_DOB_MONTH)
  let dobYear = parseInt(process.env.PERSONAL_DOB_YEAR)

  await page.evaluate(({dobDay, dobMonth, dobYear}) => {
    document.querySelector('#DobDay').value = dobDay
    document.querySelector('#DobMonth').value = dobMonth
    document.querySelector('#DobYear').value = dobYear
    document.querySelector('#Country').value = 'GB'
    document.querySelector('#Currency').value = 'GBP'
    document.querySelector('#AddressContainer').style.display = 'block'
    document.querySelector('#DeselectAllPetfreMarketingPreferences').click()
    document.querySelector('#DeselectAllThirdPartyMarketingPreferences').click()
    document.querySelector('#AcceptTAndC').click()

    document.querySelector('#DeselectAllPetfreMarketingPreferences').click()
  }, {dobDay, dobMonth, dobYear})
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-04.png', fullPage: true})

  await sleep(2)
  await page.type('#AddressLine1', process.env.PERSONAL_ADDRESS_NUMBER + ' ' + process.env.PERSONAL_ADDRESS_ROAD)
  await page.type('#TownCity', process.env.PERSONAL_ADDRESS_TOWN)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-05.png', fullPage: true})

  await sleep(2)
  console.log('click next')
  await page.evaluate(() => {
    document.querySelector('#RegistrationSubmit').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-06.png', fullPage: true})

  console.log('betfred - register v2 - end')
}

exports.register = async function (session) {
  await init()
  await registerV1(session)

  return true
}
