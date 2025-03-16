import { useEffect, useState } from "react";
import ProductList from "./category/ProductList";
import { Link } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CategoryList(){
    const [categoryData, setCategoryData] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3000/category/")
            .then((res) => res.json())
            .then((res) => setCategoryData(res))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);
    
    return (
        <>
            {
                categoryData.map((category) => {
                    return (
                        <section key={category._id} id="featured-products" className="products-carousel">
                            <div className="container-lg overflow-hidden py-5">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="section-header d-flex flex-wrap justify-content-between my-4">
                                            <h2 className="section-title">{category.CategoryName}</h2>
                                            <div className="d-flex align-items-center">
                                                <Link to={`/categoryproducts/${category._id}`} className="btn btn-primary me-2">View All</Link>
                                                <div className="swiper-buttons">
                                                    <button className={`swiper-prev btn btn-primary products-carousel-prev-${category._id}`}>❮</button>
                                                    <button className={`swiper-next btn btn-primary products-carousel-next-${category._id}`}>❯</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ProductList categoryId={category._id} />
                            </div>
                        </section>
                    );
                })
            }
        </>
    );
}