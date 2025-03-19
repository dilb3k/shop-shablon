import AboutCard from "./AboutCard";

const About = () => {
    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">
                Biz Haqimizda
            </h1>
            <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
                To‘yStyle — bu sizning to‘yingiz uchun eng sifatli va nafis mahsulotlarni taklif qiluvchi platforma.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
                <AboutCard
                    title="Bizning Missiyamiz"
                    description="Har bir to‘y o‘zgacha va betakror bo‘lishi kerak. Biz esa sizga eng yaxshi xizmatlarni taqdim qilamiz."
                />
                <AboutCard
                    title="Nega Aynan Biz?"
                    description="Bizda keng assortiment, eng yaxshi narxlar va yuqori sifat kafolatlangan!"
                />
            </div>
        </div>
    );
};

export default About;
