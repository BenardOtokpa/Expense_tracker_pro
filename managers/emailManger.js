
const nodemailer = require('nodemailer')


const emailManager = async (to, text, html, subject) => {

    var transport = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'e700b59a131edb',
          pass: '74e03746be33a1',
        },
      })
    
      await transport.sendMail({
        to: to,
        from: 'info@expensetracker.com',
        text: text,
        html: html,
        subject: subject,
      })


}

module.exports = emailManager;