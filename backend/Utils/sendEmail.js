import nodemailer  from 'nodemailer'

const sendEmail = async () => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: 587,
    // auth: {
    //   user: process.env.EMAIL_USER,
    //   pass: process.env.EMAIL_PASS,
    // },
    // tls: {
    //   rejectUnauthorized: false,
    // },

    service: 'gmail',
    auth: {
        user:process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS
    }
  });

  // Option for sending email 
  const options = {
    from:process.env.USER_EMAIL,
    to: 'buddhikagamage619@gmail.com',
    subject: 'testing',
    text: 'hola mi amigo'
  };

  // send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export default sendEmail;
