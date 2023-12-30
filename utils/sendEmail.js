const nodemailer = require("nodemailer");

const sendEmail = (email, msg) => {
  try {
    // Envoi de l'e-mail de confirmation
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.addEmail,
        pass: process.env.passapp,
      },
    });

    // Contenu du message
    const message = {
      from: process.env.addEmail,
      to: email,
      subject: "Confirmation ",
      html: msg,
    };

    // Envoi du message
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error("Error sending confirmation email", err);
      } else {
        console.log("confirmation sending email:", info.response);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { sendEmail };
