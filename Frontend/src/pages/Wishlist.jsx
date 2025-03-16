import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [products, setProducts] = useState({});
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetch("http://localhost:3000/wishlist/get", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(token);
                    setWishlistItems(data);
                    fetchProductDetails(data);
                    syncLocalWishlistToDatabase(data);
                })
                .catch((error) => console.error("Error fetching wishlist:", error));
        } else {
            const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            setWishlistItems(localWishlist);
            fetchProductDetails(localWishlist);
        }
    }, [token]);

    const fetchProductDetails = (wishlist) => {
        wishlist.forEach((item) => {
            if (item.ProductID) {
                fetch(`http://localhost:3000/product/${item.ProductID}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setProducts((prev) => ({
                            ...prev,
                            [item.ProductID]: data,
                        }));
                    })
                    .catch((error) => console.error("Error fetching product:", error));
            } else {
                console.error("ProductID is missing in wishlist item:", item);
            }
        });
    };

    const syncLocalWishlistToDatabase = (dbWishlistItems) => {
        const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (localWishlist.length > 0) {
            localWishlist.forEach((item) => {
                const existingItemInDb = dbWishlistItems.find(
                    (dbItem) => dbItem.ProductID === item.ProductID
                );
                if (!existingItemInDb) {
                    addToWishlist(item.ProductID);
                }
            });
        }
    };

    const addToWishlist = (productId) => {
        // Avoid adding duplicate items in the wishlist (check both in state and localStorage)
        setWishlistItems((prev) => {
            // Check if the item is already in the wishlist state
            if (!prev.some((item) => item.ProductID === productId)) {
                const newItem = { ProductID: productId };
                const updatedWishlist = [...prev, newItem];
                if (token) {
                    // Sync with server if logged in
                    fetch("http://localhost:3000/wishlist/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(newItem),
                    })
                        .then((res) => res.json())
                        .then(() => setWishlistItems(updatedWishlist))
                        .catch((error) => console.error("Error adding item to wishlist:", error));
                } else {
                    // Sync to localStorage if not logged in
                    let localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                    // Prevent duplicates in localStorage as well
                    if (!localWishlist.some((item) => item.ProductID === productId)) {
                        localWishlist.push(newItem);
                        localStorage.setItem("wishlist", JSON.stringify(localWishlist));
                    }
                    setWishlistItems(updatedWishlist);
                }
                return updatedWishlist;
            }
            return prev; // Return unchanged state if duplicate
        });
    };

    const removeItem = (productId) => {
        if (token) {
            // Remove from the database if logged in
            fetch(`http://localhost:3000/wishlist/delete/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    setWishlistItems((prev) => prev.filter((item) => item.ProductID !== productId));
                })
                .catch((error) => console.error("Error deleting item from wishlist:", error));
        } else {
            let localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            localWishlist = localWishlist.filter((item) => item.ProductID !== productId);
            localStorage.setItem("wishlist", JSON.stringify(localWishlist));
            setWishlistItems(localWishlist);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="row">
                    <div className="col-md-8">
                        {wishlistItems.map((item) => {
                            const product = products[item.ProductID];
                            if (!product) {
                                return <p key={item.ProductID}>Loading product details...</p>;
                            }
                            return (
                                <div key={product._id} className="card mb-3 p-3 shadow-sm">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={`../../Images/ProductImage/${product.ProductImage}`}
                                            alt={product.ProductName}
                                            className="me-3 rounded"
                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        />
                                        <div className="flex-grow-1">
                                            <h5>{product.ProductName}</h5>
                                            <p className="text-muted">₹{product.ProductPrice}</p>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => removeItem(item.ProductID)}
                                            >
                                                Remove from Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
