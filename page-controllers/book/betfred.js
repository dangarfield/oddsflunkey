const puppeteer = require('puppeteer')
const _ = require('lodash')

let page

var sleep = async function (s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000))
}
var init = async function () {
  if (!page) {
    console.log('betfred - init - start')
    let path = process.env.CHROME_PATH
    const browser = await puppeteer.launch({headless: false, executablePath: path})
    // const browser = await puppeteer.launch({headless: false})
    page = await browser.newPage()
    console.log('betfred - init - end')
  }
}

exports.register = async function (session) {
  await init()
  console.log('betfred - register v1 - start')

  // http://promotions.betfred.com/n/ppc/sports/football/2018-Season/bet-10-get-30/?siteid=14123&gclid=EAIaIQobChMIhsf4gOPE3QIVqrftCh1nywCAEAAYASAAEgJe3_D_BwE
  // https://www.betfred.com/account/registration?promo=PPC30&mred=https://betfred.mobi/register?promo=MPPC30

  // await page.goto('https://www.betfred.com/account/registration?promo=PPC30&mred=https://betfred.mobi/register?promo=MPPC30')
  await page.goto('https://betfred.mobi/register/account', {waitUntil: 'networkidle2'})
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-01.png', fullPage: true})

  // PAGE 1 - Account

  console.log('type username', session.username)
  await page.waitForSelector('#username')
  await page.type('#username', session.username)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-02.png', fullPage: true})

  console.log('type username', session.password)
  await page.type('#password', session.password)
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

  await page.waitForSelector('.registration-success__icon')
  await page.screenshot({path: 'debug/' + session.id + '/betfred-register-22.png', fullPage: true})
  let url = page.url()
  if (!url.includes('register/success')) {
    throw new Error('Registration url is incorrect - ' + url)
  }
  console.log('betfred - register - end')
}

var loginIfRequired = async function (session) {
  console.log('is login required?')
  await sleep(2)
  let userInfoElement = await page.evaluate(() => {
    return document.querySelector('.AccountMenu__UserInfo')
  })
  if (userInfoElement) {
    console.log('User already logged in')
  } else {
    console.log('User not logged in')

    console.log('login page')
    await page.waitForSelector('#username')
    await page.type('#username', session.username)
    await page.type('#password', session.password)
    await page.evaluate(() => {
      document.querySelector('#remember').click()
    })
    await page.screenshot({path: 'debug/' + session.id + '/betfred-login-01.png', fullPage: true})
    console.log('click login')
    await page.evaluate(() => {
      document.querySelector('.login-layout__form-row button').click()
    })
    await page.screenshot({path: 'debug/' + session.id + '/betfred-login-02.png', fullPage: true})

    // TODO - For some reason this is giving a HTTP error when invoking straight from deposit resume, need to check
  }
}
exports.deposit = async function (session) {
  await init()
  console.log('betfred - deposit - start')

  await page.goto('https://betfred.mobi/my-account/manage-payments', {waitUntil: 'networkidle2'})
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-01.png', fullPage: true})

  // PAGE 1 - Safe and secure

  console.log('click safe and secure')
  await page.waitForSelector('.safe-and-secure')
  await page.evaluate(() => {
    document.querySelector('.sas-input__accept-terms').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-02.png', fullPage: true})
  console.log('click next')
  await page.evaluate(() => {
    document.querySelector('.safe-and-secure__deposit').click()
  })

  // PAGE 2 - login (optional)
  await loginIfRequired(session)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-03.png', fullPage: true})

  // PAGE 3 - Manage Payments
  console.log('click add')
  await page.evaluate(() => {
    document.querySelector('#doAdd').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-04.png', fullPage: true})

  console.log('click paypal')
  await page.waitForSelector('#doAddMethod_400')
  await page.evaluate(() => {
    document.querySelector('#doAddMethod_400').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-05.png', fullPage: true})

  console.log('add amount', process.env.BETFRED_DEPOSIT)
  await page.waitForSelector('#amount')
  await page.type('#amount', process.env.BETFRED_DEPOSIT)
  await page.evaluate(() => {
    document.querySelector('#doTransaction').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-06.png', fullPage: true})

  console.log('paypal main screen')
  await page.waitForSelector('.baslLoginButtonContainer a')
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-07.png', fullPage: true})
  await page.evaluate(() => {
    document.querySelector('.baslLoginButtonContainer a').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-08.png', fullPage: true})

  console.log('paypal login email')
  await page.waitForSelector('#email')
  await page.type('#email', process.env.PAYPAL_EMAIL)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-09.png', fullPage: true})
  await page.evaluate(() => {
    document.querySelector('#btnNext').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-10.png', fullPage: true})

  console.log('paypal login password')
  await page.waitForSelector('#password')
  await page.type('#password', process.env.PAYPAL_PASSWORD)
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-11.png', fullPage: true})
  await page.evaluate(() => {
    document.querySelector('#btnLogin').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-12.png', fullPage: true})

  console.log('review button')
  await page.waitForSelector('.reviewButton button')
  await page.evaluate(() => {
    document.querySelector('.reviewButton button').click()
  })
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-13.png', fullPage: true})

  console.log('confirm paypal')
  await page.waitForSelector('#confirmButtonTop')
  await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-14.png', fullPage: true})
  // await page.evaluate(() => {
  //   document.querySelector('#confirmButtonTop').click()
  // })
  // await page.screenshot({path: 'debug/' + session.id + '/betfred-deposit-15.png', fullPage: true})

  console.log('betfred - deposit - end')
}
