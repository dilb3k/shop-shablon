import { About } from "../../Page/About";
import UsersList from "../../Page/Users/UserList";

const Home = () => {
    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">
                Xush Kelibsiz To‘yStyle!
            </h1>
            <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
                Bu yerda siz eng yaxshi to‘y xizmatlarini topasiz.
            </p>

            {/* About bo‘limini Home sahifasida chaqirish */}
            <div className="mt-10">
                <About />
                <UsersList/>
            </div>
        </div>
    );
};

export default Home;
