import React, { useState } from "react";
import { X } from "lucide-react";
import { loginUser, registerUser } from "../../../api/users/router";

const Login = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        const response = await loginUser(email, password);

        // `response` obyekt bo‘lishini tekshirish
        const { access, refresh, user } = response || {};

        console.log("User:", user); // Ma'lumot kelayotganini tekshirish

        // `user` bo‘sh bo‘lsa, default mehmon ma’lumotlarini qo‘shish
        const userData = user && Object.keys(user).length > 0
          ? user
          : {
            id: 999999,
            username: "guest",
            email: "guest@example.com",
            phone: "+998900000000",
            isGuest: true
          };

        // Token va user ma'lumotlarini saqlash
        localStorage.setItem("access_token", access || "");
        localStorage.setItem("refresh_token", refresh || "");
        localStorage.setItem("user", JSON.stringify(userData));

        onClose();
      } else {
        // RO‘YXATDAN O‘TISH (REGISTER)
        await registerUser({ username, email, password, phone });
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(
        err.response?.data?.detail || "Xatolik yuz berdi, qaytadan urinib ko‘ring."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center text-white/80 mb-6">
          {isLogin ? "Login" : "Ro‘yxatdan o‘tish"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-white/60 mb-2">
                Foydalanuvchi nomi
              </label>
              <input
                id="username"
                type="text"
                placeholder="Ismingizni kiriting"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/80 placeholder-white/50 focus:ring-2 focus:ring-yellow-500/50"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-white/60 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Emailingizni kiriting"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/80 placeholder-white/50 focus:ring-2 focus:ring-yellow-500/50"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white/60 mb-2">
              Parol
            </label>
            <input
              id="password"
              type="password"
              placeholder="Parolingizni kiriting"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/80 placeholder-white/50 focus:ring-2 focus:ring-yellow-500/50"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="phone" className="block text-white/60 mb-2">
                Telefon raqamingiz
              </label>
              <input
                id="phone"
                type="text"
                placeholder="+998901234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/80 placeholder-white/50 focus:ring-2 focus:ring-yellow-500/50"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Yuklanmoqda..." : isLogin ? "Login" : "Ro‘yxatdan o‘tish"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            {isLogin
              ? "Hisobingiz yo‘qmi?"
              : "Hisobingiz bormi?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
            >
              {isLogin ? "Ro‘yxatdan o‘tish" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
