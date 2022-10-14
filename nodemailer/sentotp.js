const nodemailer = require('nodemailer');

module.exports.sendOTPEmail = async (toMailId,otp) => {
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'akshilmalani182@gmail.com',  
            pass : 'apbixmjdabelnkhc'
        }
    })
    const mailoptions = {
        from : 'akshilmalani182@gmail.com',
        to : toMailId,
        subject : 'Test App',
        text : `Your OTP is : ${otp}`,

    }

    transporter.sendMail(mailoptions,(error,success) => {
        if(error){
            console.info(error)
        }
        // console.info(success.response)
        return true
    })
}