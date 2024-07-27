const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.generateOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const otp = crypto.randomInt(1000, 9999).toString();
        const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
        user.otp = hashedOTP;
        user.otpExpires = Date.now() + 300000; // 5 minutes

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL,
            to: user.email,
            subject: 'YOUR OTP CODE',
            text: `Your OTP is ${otp}. Expires in 5 minutes.`
        }

        transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to send OTP email' });
            } else {
                await user.save();
                res.status(200).json({ message: 'OTP sent to email' });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.verifyOTP = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
        if (user.otp !== hashedOTP || user.otpExpires < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        user.otp = undefined;
        user.otpExpires = undefined;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({ message: 'OTP verified and password changed successfully' });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal server error" });
    }
}
