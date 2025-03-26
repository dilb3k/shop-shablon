import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5001/send-otp", { phone });
      setMessage(response.data.message);
      setStep(2);
    } catch (error) {
      setMessage("Xatolik: " + error.response?.data?.error || "Noma'lum xatolik");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5001/verify-otp", { phone, otp });
      setMessage(response.data.message);
      setStep(3);
    } catch (error) {
      setMessage("Xatolik: " + error.response?.data?.error || "Noto‘g‘ri kod");
    }
  };

  return (
    <div className="p-5 flex flex-col items-center">
      {step === 1 && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Telefon raqamingiz"
            className="p-2 border rounded mb-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="bg-orange-500 text-white p-2 rounded" onClick={sendOtp}>
            SMS Yuborish
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="6 xonali kod"
            className="p-2 border rounded mb-2"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="bg-green-500 text-white p-2 rounded" onClick={verifyOtp}>
            Tasdiqlash
          </button>
        </div>
      )}

      {step === 3 && <p className="text-green-500">Tasdiq muvaffaqiyatli amalga oshirildi!</p>}

      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default Login;
