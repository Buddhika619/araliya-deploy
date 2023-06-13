import nodemailer  from 'nodemailer'
import PDFDocument  from 'pdfkit'
import puppeteer from 'puppeteer'
import dotenv from 'dotenv'


const sendEmail = async (to, id) => {

  dotenv.config()


   // Create a new PDF document

   const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });

    const page = await browser.newPage();

    // Set the content of the PDF
    await page.goto(`https://www.google.com/`);

    //uncomment following line
  //  await page.waitForSelector('#test')
  

   console.log('got it')
    // Generate the PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    // Close the browser
    await browser.close();



  // Create Email Transporter
  const transporter = nodemailer.createTransport({



    service: 'gmail',
    auth: {
        
        user:process.env.EMAIL_SRC,
        pass:process.env.EMAIL_SECRET
    }
  });

  // Option for sending email 
  const options = {
    from:  process.env.EMAIL_SRC,
    to: to,
    subject: 'Invoice',
    text: 'Thank You for doing business with us!',
    attachments: [
      {
        filename: 'document.pdf',
        content: pdf,
        contentType: 'application/pdf',
      },
    ],
  };
  

  // send email
 await transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export default sendEmail;