import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
            <motion.img
                src="/images/404-wedding.png"
                alt="Not Found"
                className="w-80 md:w-96 mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
            />

            <h1 className="text-5xl font-bold text-orange-500">Sahifa Topilmadi</h1>
            <p className="text-gray-600 mt-4 max-w-lg">
                Kechirasiz, siz qidirgan sahifa mavjud emas yoki o‘chirilgan.
                Asosiy sahifaga qaytish uchun pastdagi tugmani bosing.
            </p>

            <Link to="/" className="mt-6">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    Bosh sahifaga qaytish
                </motion.button>
            </Link>
        </div>
    );
};

export default NotFound;
