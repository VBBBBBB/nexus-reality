import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    console.log("Attempting to send email to:", options.email);
    console.log("Using User:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `Nexus Reality <${process.env.EMAIL_FROM}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
