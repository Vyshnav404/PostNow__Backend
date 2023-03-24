const nodemailer = require("nodemailer")

module.exports = async(email , subject ,text) => {
    try {
        const transporter = nodemailer.createTransport({
            service:'gmail',
            port:8090,
            secure:false,
            auth:{
                user:"vyshnav404@gmail.com",
                pass:"cfurmqbfeuxzcwwz"
            },
        });
        await transporter.sendMail({
            from :"vyshnav404@gmail.com",
            to:email,
            subject:subject,
            text: text,
        })
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not send");
        console.log(error);
        return error;
    }
};