import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Vonage } from "@vonage/server-sdk"; // 📌 Import formatini to'g'riladik
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

// ✅ Vonage sozlamalari
const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
});

// OTP kodlarni vaqtincha saqlash
const otpStorage = {};

// 📌 1️⃣ OTP yuborish
app.post("/send-otp", async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: "Telefon raqam kiritilmadi" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStorage[phone] = otp;

    try {
        const from = "VonageAPI";
        const to = phone;
        const text = `Tasdiqlash kodi: ${otp}`;

        // ✅ Vonage uchun to'g'ri SMS yuborish
        const response = await vonage.sms.send({ to, from, text });
        console.log("SMS yuborildi:", response);

        res.json({ message: "Tasdiqlash kodi yuborildi!", phone });
    } catch (error) {
        console.error("SMS yuborishda xatolik:", error);
        res.status(500).json({ error: "SMS yuborishda xatolik", details: error.message });
    }
});

// 📌 2️⃣ OTP tasdiqlash
app.post("/verify-otp", (req, res) => {
    const { phone, otp } = req.body;
    if (!otpStorage[phone]) return res.status(400).json({ error: "Telefon raqam noto‘g‘ri!" });

    if (otpStorage[phone] == otp) {
        delete otpStorage[phone]; // Tasdiqlandi, OTP o‘chirildi
        res.json({ message: "Kod tasdiqlandi!" });
    } else {
        res.status(400).json({ error: "Noto‘g‘ri kod!" });
    }
});

// 📌 Serverni ishga tushirish
app.listen(port, () => {
    console.log(`✅ Server ${port}-portda ishlayapti`);
});
