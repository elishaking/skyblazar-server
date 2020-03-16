const nodemailer = require("nodemailer");

const env = require("../../env.config");

/** @param {{name: string, email: string, phone: string, title: string,  description: string,}} details*/
const sendProjectEmail = async details => {
  const message = `
    <h1>${details.title}</h1>
    <p>${details.description}</p>
    <br>
    <h3>Client Details</h3>
    <p>${details.name}</p>
    <p>${details.email}</p>
    <p>${details.phone}</p>
    <br/>
  `;

  // let testAccount = await nodemailer.createTestAccount();
  const emailAccount = {
    user: process.env.MAIL_ADDRESS || env.MAIL_ADDRESS,
    password: process.env.PROJECT_EMAIL_PASSWORD || env.MAIL_PASSWORD
  };

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "skyblazar.com",
    // port: 465,
    // secure: true, // true for 465, false for other ports
    service: "gmail",
    auth: {
      user: emailAccount.user,
      pass: emailAccount.password
    }
  });

  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: `"${details.name}" ${emailAccount.user}`, // sender address
      to: "ek.chibueze@gmail.com", //'bar@example.com, baz@example.com', // list of receivers
      subject: "New Skyblazar Client Project 😎😀🤗", // Subject line
      replyTo: details.email,
      text: "New Skyblazar Client Project", // plain text body
      html: message // html body
    })
    .catch(err => {
      console.log(err);
      return false;
    });

  console.log("Message sent: %s", info.messageId);
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  return true;
};

module.exports.sendProjectEmail = sendProjectEmail;
