const nodemailer = require("nodemailer");
const Admin = require("../model/admin.model");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "prajapatijay0729@gmail.com",
    pass: "vjnlqqwbvxfrioat", 
  },
});

async function sendOtpEmail(toEmail, otp) {
  return transporter.sendMail({
    from: '"Admin Panel" <prajapatijay0729@gmail.com>',
    to: toEmail,
    subject: "Forgot Password OTP",
    text: `Your OTP is: ${otp}`,
  });
}

exports.sendMail = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      console.log("Admin not found");
      return res.redirect("/admin/forgotpassword");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    res.cookie("otp", otp);
    res.cookie("email", req.body.email);

    await sendOtpEmail(req.body.email, otp);

    console.log("OTP sent to:", req.body.email);
    return res.render("forgotpassword/otp");

  } catch (error) {
    console.error("Mail Error:", error);
    return res.redirect("/admin/forgotpassword");
  }
};
