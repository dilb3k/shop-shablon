const AboutCard = ({ title, description }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm text-center border border-orange-300">
            <h2 className="text-2xl font-semibold text-orange-500">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    );
};

export default AboutCard;
