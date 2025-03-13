import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      <span> ({rating})</span>
    </div>
  );
};

const UserData = ({ remark }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/user/getOne/' + remark.UserId)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [remark.UserId]);

  return (
    <div className="remark-card p-3 mb-3 shadow rounded">
      <div className="d-flex align-items-center mb-2">
        <img src={'./../../Images/UserImage/'+userData.UserProfileImage} alt={userData.UserName} className="user-image rounded-circle m-3" height={50} width={50}/>
        <div className="ml-3">
          <strong>{userData.UserName}</strong>
          <StarRating rating={remark.Rating} />
        </div>
      </div>
      <p className="remark-description mx-3">{remark.RemarkDescription}</p>
      <small className="text-muted mx-3">{new Date(remark.UpdatedAt).toLocaleString()}</small>
    </div>
  );
};

export default function ProductDetail(props) {
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState("");
  const [rating, setRating] = useState(5);
  const [previousRating, setPreviousRating] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/product/' + productId)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      })
      .catch((error) => console.error("Error fetching product data:", error));

    fetch('http://localhost:3000/remark/product/' + productId)
      .then((res) => res.json())
      .then((data) => {
        const totalRating = data.reduce((sum, remark) => sum + remark.Rating, 0);
        setPreviousRating(data.length > 0 ? totalRating / data.length : 0);
        setRemarks(data);
      })
      .catch((error) => console.error("Error fetching remarks:", error));
  }, [productId]);

  const handleRemarkSubmit = () => {
    if (newRemark.trim()) {
      const newRemarkData = {
        RemarkDescription: newRemark,
        Rating: rating,
        ProductID: productId,
      };

      fetch(`http://localhost:3000/remark/addRemarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(newRemarkData),
      })
        .then((res) => res.json())
        .then((data) => {
          setRemarks((prev) => [...prev, data.remark]);
          setNewRemark("");
        })
        .catch((error) => console.error("Error submitting remark:", error));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <img
            src={'./../../Images/ProductImage/'+productData.ProductImage}
            alt={productData.ProductName}
            style={{ width:"100%", borderRadius: "8px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <h2 className="display-4">{productData.ProductName}</h2>
          <div className="rating">
            <StarRating rating={previousRating} />
          </div>
          <p>{productData.ProductDescription}</p>
          <div className="d-flex  align-items-center gap-2">
            <del className="h4">₹{productData.ProductPrice}</del>
            <span className="text-dark fw-semibold h2">
              ₹{productData.ProductPrice - (productData.ProductPrice * (productData.ProductDiscount / 100))}
            </span>
            <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
              {productData.ProductDiscount}% OFF
            </span>
          </div>

          <div className="d-flex justify-content-center width-100">
            <div className="d-flex gap-3">
              <input type="number" name="quantity" className="form-control" defaultValue="1" min="1"/>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <div className="remarks-section mt-5">
        <h4>Customer Remarks</h4>
        <div className="remarks-list mt-3">
          {remarks.length > 0 ? (
            remarks.map((remark, index) => (
              <UserData key={index} remark={remark} />
            ))
          ) : (
            <p>No remarks yet. Be the first to leave a review!</p>
          )}
        </div>

        <div className="add-remark mt-4">
          <textarea
            className="form-control"
            rows="4"
            value={newRemark}
            onChange={(e) => setNewRemark(e.target.value)}
            placeholder="Write your remark here..."
          ></textarea>
          <div className="mt-2">
            <label>Rating:</label>
            <select
              className="form-control"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
          </div>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handleRemarkSubmit}
          >
            Submit Remark
          </button>
        </div>
      </div>
    </div>
  );
}
