import { useEffect, useState } from "react";

export default function Category() {

    useEffect(() => {
        initSwiper(); // Initialize Swiper after component mounts
    }, []);

    var initSwiper = function () {
        var category_swiper = new Swiper(".category-carousel", {
            slidesPerView: 8,
            spaceBetween: 30,
            speed: 500,
            navigation: {
                nextEl: ".category-carousel-next",
                prevEl: ".category-carousel-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 5,
                },
                1500: {
                    slidesPerView: 8,
                },
            },
        });

        $(".products-carousel").each(function () {
            var $el_id = $(this).attr("id");

            var products_swiper = new Swiper("#" + $el_id + " .swiper", {
                slidesPerView: 5,
                spaceBetween: 30,
                speed: 500,
                navigation: {
                    nextEl: "#" + $el_id + " .products-carousel-next",
                    prevEl: "#" + $el_id + " .products-carousel-prev",
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                    1500: {
                        slidesPerView: 5,
                    },
                },
            });
        });

        // Initialize other Swipers
        // (thumb_slider, large_slider, etc.)

    };

    const [categoryData, setCategoryData] = useState([]);
    const [productData, setProductData] = useState({}); // Store products by category ID

    useEffect(() => {
        // Fetch categories data
        fetch("http://localhost:3000/category/")
            .then((res) => res.json())
            .then((res) => setCategoryData(res))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    const fetchProductsByCategory = (categoryId) => {
        // Fetch products for a given category
        fetch(`http://localhost:3000/product/category/${categoryId}`)
            .then((res) => res.json())
            .then((res) => {
                setProductData((prev) => ({ ...prev, [categoryId]: res })); // Store products by category ID
            })
            .catch((error) => console.error("Error fetching products:", error));
    };

    // Render products for a given category
    const ProductList = ({ categoryId }) => {
        useEffect(() => {
            // Fetch products when the categoryId changes
            if (!productData[categoryId]) {
                fetchProductsByCategory(categoryId);
            }
        }, [categoryId, productData]);

        const products = productData[categoryId] || [];

        return (
            <>
                {products.map((productObj) => {                
                    return (
                        <div className="product-item swiper-slide" key={productObj._id} style={{width:"25%",margin:"10px"}}>
                            <figure>
                                <a href={'./../../Images/ProductImage/'+productObj.ProductImage} title="Product Title">
                                    <img src={'./../../Images/ProductImage/'+productObj.ProductImage} style={{width: "200px", height: "300px", borderRadius: "8px", objectFit: "cover"}} alt="Product Thumbnail" className="tab-image" />
                                </a>
                            </figure>
                            <div className="d-flex flex-column text-center ">
                                <h3 className="fs-6 fw-normal">{productObj.ProductName}</h3>
                                <div>
                                    <span className="rating">
                                        <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                        <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                        <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                        <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                        <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                    </span>
                                    <span>({productObj.ProductPurchaseCount})</span>
                                </div>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <del>₹{productObj.ProductPrice}</del>
                                    <span className="text-dark fw-semibold">₹{productObj.ProductPrice - (productObj.ProductPrice * (productObj.ProductDiscount / 100))}</span>
                                    <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">{productObj.ProductDiscount}% OFF</span>
                                </div>
                                <div className="button-area p-3 pt-0">
                                    <div className="row g-1 mt-2">
                                        <div className="col-3">
                                            <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="1" onChange={(v) => {}}
                                            />
                                        </div>
                                        <div className="col-7">
                                            <a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg>Add to Cart</a>
                                        </div>
                                        <div className="col-2">
                                            <a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };

    const CategoryList = () => {
        return categoryData.map((category) => (
            <section key={category._id} id="featured-products" className="products-carousel">
                <div className="container-lg overflow-hidden py-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-header d-flex flex-wrap justify-content-between my-4">
                                <h2 className="section-title">{category.CategoryName}</h2>
                                <div className="d-flex align-items-center">
                                    <a href="#" className="btn btn-primary me-2">View All</a>
                                    <div className="swiper-buttons">
                                        <button className="swiper-prev products-carousel-prev btn btn-primary">❮</button>
                                        <button className="swiper-next products-carousel-next btn btn-primary">❯</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="swiper">
                                <div className="swiper-wrapper">
                                    <ProductList categoryId={category._id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        ));
    };

    return (
        <div>
            <h1>Categories</h1>
            {categoryData.length === 0 ? (
                <p>Loading categories...</p>
            ) : (
                <CategoryList />
            )}
        </div>
    );
}