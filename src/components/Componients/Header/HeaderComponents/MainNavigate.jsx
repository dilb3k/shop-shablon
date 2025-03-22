import { DropdownMenuItem } from "./DropDownItem";

export const MainNavigation = () => {
    const menuItems = [
        {
            title: "Kolleksiyalar",
            items: [
                { name: "Kelin koylaklari", link: "/collections/wedding-dresses" },
                { name: "Aksessuarlar", link: "/collections/accessories" },
                { name: "Kuyov kostyumlari", link: "/collections/groom-suits" },
                { name: "Kelinlar uchun liboslar", link: "/collections/bridal-party" }
            ]
        },
        {
            title: "Biz haqimizda",
            items: [
                { name: "Bizning hikoyamiz", link: "/about/our-story" },
                { name: "Sifat kafolati", link: "/about/quality" },
                { name: "Matbuot", link: "/about/press" },
                { name: "Ish joylar", link: "/about/careers" }
            ]
        },
        {
            title: "Xizmatlar",
            items: [
                { name: "Yetkazib berish", link: "/services/delivery" },
                { name: "O'zgartirishlar", link: "/services/alterations" },
                { name: "Maslahat", link: "/services/consultation" }
            ]
        },
        {
            title: "Galereya",
            items: [
                { name: "Kelin koylaklari", link: "/gallery/wedding-dresses" },
                { name: "Aksessuarlar", link: "/gallery/accessories" },
                { name: "Haqiqiy to'ylar", link: "/gallery/real-weddings" }
            ]
        }
    ];

    return (
        <div className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 py-4 px-8 relative border-t border-b border-amber-200">
            {/* Decorative pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute left-0 top-0 w-full h-full" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")" }}></div>
            </div>

            <nav className="flex justify-between items-center relative z-10">
                <div className="flex space-x-8 text-amber-800 font-serif font-medium">
                    {menuItems.map((item, index) => (
                        <DropdownMenuItem key={index} title={item.title} items={item.items} />
                    ))}

                    <a href="/blog" className="hover:text-amber-500 transition-colors duration-300 font-serif">Blog</a>
                    <a href="/contact" className="hover:text-amber-500 transition-colors duration-300 font-serif">Aloqa</a>
                </div>

             
            </nav>
        </div>
    );
};
