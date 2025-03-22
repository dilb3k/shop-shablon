import { About } from "../About";
import UsersList from "../../Componients/Users/UserList";
import Input from "../../ui/Inputs/Input";
import RSVPForm from "../../ui/Usages/Usege";
import Button from "../../ui/Buttons/Button";
import Card from "../../ui/Cards/Card";
import Badge from "../../ui/Badges/Badge";
import { getProduct } from "../../../api/products/router";
import ProductCard from "../ProductCard/ProductCard";

const Home = () => {

    const products = getProduct();
    return (
        <div className="border p-4 rounded-lg shadow-md flex items-center gap-4">
  <ProductCard/>
        </div>
    );
};

export default Home;
