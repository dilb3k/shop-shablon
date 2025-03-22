
export const LoginForm = () => (
    <form className="space-y-4">
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-amber-700 mb-1 font-serif">Email</label>
            <input
                type="email"
                id="email"
                placeholder="email@example.com"
                className="w-full px-3 py-2 border border-amber-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
            />
        </div>
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-amber-700 mb-1 font-serif">Parol</label>
            <input
                type="password"
                id="password"
                placeholder="********"
                className="w-full px-3 py-2 border border-amber-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
            />
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-amber-400 focus:ring-amber-300 border-amber-200 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-amber-700 font-serif">
                    Eslab qolish
                </label>
            </div>
            <div className="text-sm">
                <a href="#" className="font-medium text-amber-500 hover:text-amber-400 font-serif">
                    Parolni unutdingizmi?
                </a>
            </div>
        </div>
        <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
            >
                Kirish
            </button>
        </div>
        <div className="text-center mt-4">
            <span className="text-sm text-amber-700 font-serif">Hisobingiz yo'qmi? </span>
            <a href="#" className="text-sm font-medium text-amber-500 hover:text-amber-400 font-serif">
                Ro'yxatdan o'tish
            </a>
        </div>
    </form>
);
