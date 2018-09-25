const puppeteer = require('puppeteer')
const _ = require('lodash')

let page

var sleep = async function (s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000))
}
var init = async function () {
  if (!page) {
    console.log('888sport - init - start')
    let path = process.env.CHROME_PATH
    const browser = await puppeteer.launch({headless: false, executablePath: path})
    // const browser = await puppeteer.launch({headless: false})
    page = await browser.newPage()
    console.log('888sport - init - end')
  }
}

exports.register = async function (session) {
  await init()
  console.log('888sport - register - start')

  await page.goto('https://www.888sport.com/#/home', {waitUntil: 'networkidle2'})
  await page.screenshot({path: 'debug/' + session.id + '/888sport-register-01.png', fullPage: true})

  // PAGE 1 - Click login
  await page.waitForSelector('.lBregister p')
  await page.click('.lBregister p')
  await sleep(2)

  let frames = await page.frames()
  // console.log('frames', frames)
  var loginFrame = frames.find(f => f.name() === 'generalIframe')
  // console.log('loginFrame', loginFrame)

  // PAGE 2 - Personal
  await loginFrame.waitForSelector('#input-fname')
  await loginFrame.type('#input-fname', process.env.PERSONAL_NAME_FIRST)
  await loginFrame.type('#input-lname', process.env.PERSONAL_NAME_LAST)
  await loginFrame.type('#input-email', session.email.replace('+', ''))
  await loginFrame.select('#birthDay', process.env.PERSONAL_DOB_DAY)
  await loginFrame.select('#birthMonth', process.env.PERSONAL_DOB_MONTH)
  await loginFrame.select('#birthYear', process.env.PERSONAL_DOB_YEAR)
  await loginFrame.click('#gender-option1')
  await loginFrame.click('#span-input-terms')
  await page.screenshot({path: 'debug/' + session.id + '/888sport-register-02.png', fullPage: true})
  await loginFrame.click('#btn-next1')

  // PAGE 2 - Account
  await sleep(2)
  await loginFrame.waitForSelector('#input-username')
  await loginFrame.type('#input-username', session.username)
  await loginFrame.type('#input-password', session.password)
  await loginFrame.select('#input-security-question', '2')
  await loginFrame.type('#input-security-answer', process.env.PERSONAL_MOTHER)
  await page.screenshot({path: 'debug/' + session.id + '/888sport-register-03.png', fullPage: true})
  await loginFrame.click('#btn-next2')

  // PAGE 2 - Address
  await sleep(2)
  await loginFrame.waitForSelector('#input-housenumber')
  await loginFrame.type('#input-housenumber', process.env.PERSONAL_ADDRESS_NUMBER)
  await loginFrame.type('#input-postalCode', process.env.PERSONAL_ADDRESS_POSTCODE)
  await loginFrame.type('#input-mobileNumber', process.env.PERSONAL_PHONE)
  await loginFrame.click('#marketing-subscription-checkbox-lbl')
  await loginFrame.select('#input-occupation', '3')
  await page.screenshot({path: 'debug/' + session.id + '/888sport-register-04.png', fullPage: true})
  await loginFrame.click('#btn-register')

  console.log('888sport - register - end')
}
