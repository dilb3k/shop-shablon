
export const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-amber-800 opacity-50"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-gradient-to-br from-white via-white to-amber-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-300 to-amber-400"></div>
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-50 rounded-full opacity-20"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-100 rounded-full opacity-20"></div>

                        <div className="absolute top-0 right-0 pt-4 pr-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-white rounded-full p-1 text-amber-500 hover:text-amber-700 focus:outline-none shadow-md"
                            >
                                <span className="sr-only">Yopish</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-xl leading-6 font-medium text-amber-900 mb-4 font-serif border-b border-amber-200 pb-2">Shaxsiy hisobga kirish</h3>
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
