import { motion } from "framer-motion";

const Button = ({ text, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={onClick}
        >
            {text}
        </motion.button>
    );
};

export default Button;
