import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import WishlistIcon from './../assets/wishlist.svg'
import CartIcon from './../assets/cart-light.svg'
import StarFullIcon from './../assets/star-full.svg';
import StarHalfIcon from './../assets/star-half.svg';
import StarEmptyIcon from './../assets/star-empty.svg';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const renderStar = (type) => {
        if (type === 'full') {
            return <img src={StarFullIcon} alt="star-full" width={18} height={18} />;
        } else if (type === 'half') {
            return <img src={StarHalfIcon} alt="star-half" width={18} height={18} />;
        } else {
            return <img src={StarEmptyIcon} alt="star-empty" width={18} height={18} />;
        }
    };

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, index) => (
                <span key={`full-${index}`}>{renderStar('full')}</span>
            ))}
            {halfStars === 1 && <span>{renderStar('half')}</span>}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`}>{renderStar('empty')}</span>
            ))}
        </div>
    );
};

export default function CategoryProducts() {
    const { categoryId } = useParams();
    const [productData, setProductData] = useState([]);
    const [remarksData, setRemarksData] = useState({});

    useEffect(() => {
        fetch('http://localhost:3000/product/category/' + categoryId)
            .then((res) => res.json())
            .then((data) => setProductData(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, [categoryId]);

    const fetchRemarksForProduct = (productId) => {
        fetch('http://localhost:3000/remark/product/' + productId)
            .then((res) => res.json())
            .then((remarks) => {
                const totalRating = remarks.reduce((sum, remark) => sum + remark.Rating, 0);
                const averageRating = remarks.length > 0 ? totalRating / remarks.length : 0;
                setRemarksData((prev) => ({ ...prev, [productId]: averageRating }));
            })
            .catch((error) => console.error("Error fetching remarks:", error));
    };

    useEffect(() => {
        productData.forEach((productObj) => {
            fetchRemarksForProduct(productObj._id);
        });
    }, [productData]);

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                {
                    productData.map((productObj) => {
                        const averageRating = remarksData[productObj._id] || 0;

                        return (

                            <div className="product-item col-3" key={productObj._id} style={{ marginBottom: "70px" }}>
                                <figure>
                                    <Link to={`/product/${productObj._id}`} title={productObj.ProductName}>
                                        <img src={`./../../Images/ProductImage/${productObj.ProductImage}`} style={{ width: "200px", height: "300px", borderRadius: "8px", objectFit: "cover" }} alt="Product Thumbnail" className="tab-image" />
                                    </Link>
                                </figure>
                                <div className="d-flex flex-column text-center">
                                    <h3 className="fs-6 fw-normal">{productObj.ProductName}</h3>
                                    <div className="d-flex justify-content-center">
                                        <StarRating rating={averageRating} />
                                        <span>({productObj.ProductPurchaseCount})</span>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                        <del>₹{productObj.ProductPrice}</del>
                                        <span className="text-dark fw-semibold">
                                            ₹{productObj.ProductPrice - (productObj.ProductPrice * (productObj.ProductDiscount / 100))}
                                        </span>
                                        <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                                            {productObj.ProductDiscount}% OFF
                                        </span>
                                    </div>
                                    <div className="button-area p-3 pt-0">
                                        <div className="row g-1 mt-2">
                                            <div className="col-3">
                                                <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="1" onChange={() => { }} />
                                            </div>
                                            <div className="col-7">
                                                <a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                                                    <img src={CartIcon} alt="cart" height={18} width={18} />
                                                    Add to Cart
                                                </a>
                                            </div>
                                            <div className="col-2">
                                                <a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6">
                                                    <img src={WishlistIcon} alt="cart" height={18} width={18} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>);
                    })}
            </div>
        </div>
    );
}
