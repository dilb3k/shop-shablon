
import { getProduct } from "../../../api/products/router";
import ElegantWeddingBanner from "../../Componients/Banner/Banner";
import ProductCard from "../ProductCard/ProductCard";

const Home = () => {

    const products = getProduct();
    return (
        <div className="w-full">
            <ElegantWeddingBanner/>
            <ProductCard />
        </div>
    );
};

export default Home;
