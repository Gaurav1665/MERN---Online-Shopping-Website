import { useEffect, useState } from "react";
import WishlistIcon from './../../assets/wishlist.svg';
import CartIcon from './../../assets/cart-light.svg';
import StarFullIcon from './../../assets/star-full.svg';
import StarHalfIcon from './../../assets/star-half.svg';
import StarEmptyIcon from './../../assets/star-empty.svg';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, index) => <img key={`full-${index}`} src={StarFullIcon} alt="full-star" width={18} height={18} />)}
            {halfStars === 1 && <img src={StarHalfIcon} alt="half-star" width={18} height={18} />}
            {[...Array(emptyStars)].map((_, index) => <img key={`empty-${index}`} src={StarEmptyIcon} alt="empty-star" width={18} height={18} />)}
        </div>
    );
};

export default function ProductList({ categoryId }) {
    const [productData, setProductData] = useState({});
    const [remarksData, setRemarksData] = useState({});

    useEffect(() => {
        if (!productData[categoryId]) {
            fetch(`http://localhost:3000/product/category/${categoryId}`)
                .then((res) => res.json())
                .then((res) => setProductData((prev) => ({ ...prev, [categoryId]: res })))
                .catch((error) => console.error("Error fetching products:", error));
        }
    }, [categoryId, productData]);

    useEffect(() => {
        if (productData[categoryId]) {
            productData[categoryId].forEach((product) => {
                if (!remarksData[product._id]) {
                    fetch(`http://localhost:3000/remark/product/${product._id}`)
                        .then((res) => res.json())
                        .then((remarks) => {
                            const totalRating = remarks.reduce((sum, remark) => sum + remark.Rating, 0);
                            const averageRating = remarks.length > 0 ? totalRating / remarks.length : 0;
                            setRemarksData((prev) => ({ ...prev, [product._id]: averageRating }));
                        })
                        .catch((error) => console.error("Error fetching remarks:", error));
                }
            });
        }
    }, [categoryId, productData]);

    const products = productData[categoryId] || [];

    return (
        <>
            <Swiper className="d-flex" modules={[Navigation, Pagination]} spaceBetween={20} slidesPerView={4} speed={500} navigation={{  nextEl: `.products-carousel-next-${categoryId}`, prevEl: `.products-carousel-prev-${categoryId}` }}>
                {products.map((product) => {
                    const averageRating = remarksData[product._id] || 0;
                    return (
                        <SwiperSlide key={product._id} className="product-item">
                            <figure>
                                <Link to={`/product/${product._id}`} title={product.ProductName}>
                                    <img src={`./../../Images/ProductImage/${product.ProductImage}`} alt={product.ProductName} className="tab-image" style={{ width: "200px", height: "300px", borderRadius: "8px", objectFit: "cover" }} />
                                </Link>
                            </figure>
                            <div className="d-flex flex-column text-center">
                                <h3 className="fs-6 fw-normal">{product.ProductName}</h3>
                                <div className="d-flex justify-content-center">
                                    <StarRating rating={averageRating} />
                                    <span>({product.ProductPurchaseCount})</span>
                                </div>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <del>₹{product.ProductPrice}</del>
                                    <span className="text-dark fw-semibold">₹{product.ProductPrice - (product.ProductPrice * (product.ProductDiscount / 100))}</span>
                                    <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">{product.ProductDiscount}% OFF</span>
                                </div>
                                <div className="button-area p-3 pt-0">
                                    <div className="row g-1 mt-2">
                                        <div className="col-3">
                                            <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" />
                                        </div>
                                        <div className="col-7">
                                            <a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                                                <img src={CartIcon} alt="cart" height={18} width={18} /> Add to Cart
                                            </a>
                                        </div>
                                        <div className="col-2">
                                            <a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6">
                                                <img src={WishlistIcon} alt="wishlist" height={18} width={18} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}