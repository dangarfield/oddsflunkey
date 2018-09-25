const puppeteer = require('puppeteer')
const _ = require('lodash')

let page

var sleep = async function (s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000))
}
var init = async function () {
  if (!page) {
    console.log('skybet - init - start')
    let path = process.env.CHROME_PATH
    const browser = await puppeteer.launch({headless: false, executablePath: path})
    // const browser = await puppeteer.launch({headless: false})
    page = await browser.newPage()
    console.log('skybet - init - end')
  }
}

exports.register = async function (session) {
  await init()
  console.log('skybet - register - start')

  await page.goto('https://www.skybet.com/secure/identity/m/register/step-1/mskybet?dl=1&urlconsumer=https://m.skybet.com', {waitUntil: 'networkidle2'})
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-01.png', fullPage: true})

  // PAGE 1 - Name
  console.log('type name', process.env.PERSONAL_NAME_FIRST, process.env.PERSONAL_NAME_LAST)
  await page.waitForSelector('[data-qa="FirstNameInput"]')
  await page.type('[data-qa="FirstNameInput"]', process.env.PERSONAL_NAME_FIRST)
  await page.type('[data-qa="LastNameInput"]', process.env.PERSONAL_NAME_LAST)
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-02.png', fullPage: true})
  await page.click('[data-qa="SubmitForm"]')

  // PAGE 2 - DOB
  console.log('type DOB', process.env.PERSONAL_DOB_DAY, process.env.PERSONAL_DOB_MONTH, process.env.PERSONAL_DOB_YEAR)
  await page.waitForSelector('[data-qa="DOBDayInput"]')
  await page.type('[data-qa="DOBDayInput"]', process.env.PERSONAL_DOB_DAY)
  await page.type('[data-qa="DOBMonthInput"]', process.env.PERSONAL_DOB_MONTH)
  await page.type('[data-qa="DOBYearInput"]', process.env.PERSONAL_DOB_YEAR)
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-03.png', fullPage: true})
  await page.click('[data-qa="SubmitForm"]')

  // PAGE 3 - Postcode
  console.log('type postcode', process.env.PERSONAL_ADDRESS_POSTCODE)
  await page.waitForSelector('[data-qa="PostcodeInput"]')
  await page.type('[data-qa="PostcodeInput"]', process.env.PERSONAL_ADDRESS_POSTCODE)
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-04.png', fullPage: true})
  await page.click('[data-qa="SubmitForm"]')

  // PAGE 4 - Address
  console.log('type house number', process.env.PERSONAL_ADDRESS_NUMBER)
  await page.waitForSelector('[data-qa="HouseNumberInput"]')
  await page.type('[data-qa="HouseNumberInput"]', process.env.PERSONAL_ADDRESS_NUMBER)
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-05.png', fullPage: true})
  await page.click('[data-qa="SubmitForm"]')

  // PAGE 5 - Email
  console.log('type email', session.email.replace('+', ''), 'Note: Plus removed, have to add it back in later')
  await page.waitForSelector('[data-qa="EmailInput"]')
  await page.type('[data-qa="EmailInput"]', session.email.replace('+', ''))
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-06.png', fullPage: true})
  await page.click('[data-qa="SubmitForm"]')

  // PAGE 6 - Phone
  console.log('type phone', '0' + process.env.PERSONAL_PHONE)
  await page.waitForSelector('[data-qa="PhoneNumberInput"]')
  await page.type('[data-qa="PhoneNumberInput"]', '0' + process.env.PERSONAL_PHONE)
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-07.png', fullPage: true})
  await page.click('[data-qa="SubmitForm"]')

  // PAGE 7 - Username
  console.log('type username', session.username)
  await page.waitForSelector('[data-qa="UsernameInput"]')
  await page.type('[data-qa="UsernameInput"]', session.username)
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-08.png', fullPage: true})
  await page.click('[data-qa="SubmitForm"]')

  // PAGE 8 - Mothers name
  console.log('type mothers name', process.env.PERSONAL_MOTHER)
  await page.waitForSelector('[data-qa="MothersMaidenInput"]')
  await page.type('[data-qa="MothersMaidenInput"]', process.env.PERSONAL_MOTHER)
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-09.png', fullPage: true})
  await page.click('[data-qa="SubmitForm"]')

  // PAGE 9 - Security Question
  console.log('type security question', process.env.PERSONAL_CAR)
  await page.waitForSelector('[data-qa="SecurityQuestionInput"]')
  await page.select('[data-qa="SecurityQuestionInput"]', 'Name of your first car?')
  await page.type('[data-qa="SecurityAnswerInput"]', process.env.PERSONAL_CAR)
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-10.png', fullPage: true})
  await page.click('[data-qa="SubmitForm"]')

  // PAGE 10 - Pin
  console.log('type pin', process.env.BOOK_PIN)
  await page.waitForSelector('[data-qa="Pin1Input"]')
  await page.type('[data-qa="Pin1Input"]', process.env.BOOK_PIN.charAt(1 - 1))
  await page.type('[data-qa="Pin2Input"]', process.env.BOOK_PIN.charAt(2 - 1))
  await page.type('[data-qa="Pin3Input"]', process.env.BOOK_PIN.charAt(3 - 1))
  await page.type('[data-qa="Pin4Input"]', process.env.BOOK_PIN.charAt(4 - 1))
  await page.type('[data-qa="Pin5Input"]', process.env.BOOK_PIN.charAt(5 - 1))
  await page.type('[data-qa="Pin6Input"]', process.env.BOOK_PIN.charAt(6 - 1))
  await page.screenshot({path: 'debug/' + session.id + '/skybet-register-11.png', fullPage: true})
  await page.click('[data-qa="SubmitForm"]')

  // PAGE 11 - Terms
  console.log('agree terms')
  await page.waitForSelector('[data-qa="TermsPPCheck"]')
  await page.click('[data-qa="TermsPPCheck"]')
  //   await page.screenshot({path: 'debug/' + session.id + '/skybet-register-12.png', fullPage: true})
  //   await page.click('[data-qa="SubmitForm"]')

  //   // Complete
  //   await page.waitForSelector('[data-qa="VisaCheckoutButton"]')
  //   await page.screenshot({path: 'debug/' + session.id + '/skybet-register-13.png', fullPage: true})

  console.log('skybet - register - end')
}
