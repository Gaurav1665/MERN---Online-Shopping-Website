import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState({});
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetch("http://localhost:3000/cart/get", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    setCartItems(data);
                    fetchProductDetails(data);
                    syncLocalCartToDatabase(data);
                })
                .catch((error) => console.error("Error fetching cart:", error));
        } else {
            const localCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItems(localCart);
            fetchProductDetails(localCart);
        }
    }, [token]);

    const fetchProductDetails = (cart) => {
        cart.forEach((item) => {
            fetch(`http://localhost:3000/product/${item.ProductID}`)
                .then((res) => res.json())
                .then((data) => {
                    setProducts((prev) => ({ ...prev, [item.ProductID]: data }));
                })
                .catch((error) => console.error("Error fetching product:", error));
        });
    };

    const syncLocalCartToDatabase = (dbCartItems) => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (localCart.length > 0) {
            localCart.forEach((item) => {
                const existingItemInDb = dbCartItems.find((dbItem) => dbItem.ProductID === item.ProductID);
                if (!existingItemInDb) {
                    addToCart(item.ProductID, item.ProductQuantity);
                }
            });
        }
    };

    const addToCart = (productId, quantity) => {
        if (token) {
            fetch("http://localhost:3000/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ProductID: productId, ProductQuantity: quantity }),
            })
                .then((res) => res.json())
                .then(() => {
                    setCartItems((prev) => [...prev, { ProductID: productId, ProductQuantity: quantity }]);
                })
                .catch((error) => console.error("Error adding item to cart:", error));
        } else {
            let localCart = JSON.parse(localStorage.getItem("cart")) || [];
            localCart.push({ ProductID: productId, ProductQuantity: quantity });
            localStorage.setItem("cart", JSON.stringify(localCart));
            setCartItems(localCart);
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        if (token) {
            fetch("http://localhost:3000/cart/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ProductID: productId, ProductQuantity: newQuantity }),
            })
                .then((res) => res.json())
                .then(() => {
                    setCartItems((prev) =>
                        prev.map((item) =>
                            item.ProductID === productId ? { ...item, ProductQuantity: newQuantity } : item
                        )
                    );
                })
                .catch((error) => console.error("Error updating cart:", error));
        } else {
            let localCart = JSON.parse(localStorage.getItem("cart")) || [];
            localCart = localCart.map((item) =>
                item.ProductID === productId ? { ...item, ProductQuantity: newQuantity } : item
            );
            localStorage.setItem("cart", JSON.stringify(localCart));
            setCartItems(localCart);
        }
    };

    const removeItem = (productId) => {
        if (token) {
            fetch(`http://localhost:3000/cart/delete/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    setCartItems((prev) => prev.filter((item) => item.ProductID !== productId));
                })
                .catch((error) => console.error("Error deleting item:", error));
        } else {
            let localCart = JSON.parse(localStorage.getItem("cart")) || [];
            localCart = localCart.filter((item) => item.ProductID !== productId);
            localStorage.setItem("cart", JSON.stringify(localCart));
            setCartItems(localCart);
        }
    };

    const proceedToCheckout = async () => {
        if (!token) {
            navigate("/login");
        } else if (cartItems.length === 0) {
            alert("Your cart is empty!");
        } else {
            try {
                const orderData = {
                    ProductItems: cartItems.map(item => ({
                        ProductID: item.ProductID,
                        ProductQuantity: item.ProductQuantity
                    })),
                    TotalAmount: cartItems.reduce((total, item) => {
                        const product = products[item.ProductID];
                        return total + (product ? product.ProductPrice * item.ProductQuantity : 0);
                    }, 0),
                    OrderDate: new Date(),
                };
    
                const response = await fetch("http://localhost:3000/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(orderData),
                });
    
                if (!response.ok) {
                    throw new Error("Failed to place order");
                }
    
                if (token) {
                    fetch("http://localhost:3000/cart/clear", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } else {
                    localStorage.removeItem("cart");
                }
    
                navigate("/order");
            } catch (error) {
                console.error("Error placing order:", error);
                alert("There was an issue placing your order. Please try again.");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="row">
                    <div className="col-md-8">
                        {cartItems.map((item) => {
                            const product = products[item.ProductID];
                            return product ? (
                                <div key={item.ProductID} className="card mb-3 p-3 shadow-sm">
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
                                            <div className="d-flex align-items-center">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() =>
                                                        item.ProductQuantity > 1
                                                            ? updateQuantity(item.ProductID, item.ProductQuantity - 1)
                                                            : removeItem(item.ProductID)
                                                    }
                                                >
                                                    {item.ProductQuantity > 1 ? "−" : "🗑"}
                                                </button>
                                                <span className="mx-2">{item.ProductQuantity}</span>
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() =>
                                                        updateQuantity(item.ProductID, item.ProductQuantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <p className="fw-bold">₹{product.ProductPrice * item.ProductQuantity}</p>
                                    </div>
                                </div>
                            ) : (
                                <p key={item.ProductID}>Loading product details...</p>
                            );
                        })}
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3 shadow-sm">
                            <h5>Order Summary</h5>
                            <p>
                                Total Items:{" "}
                                {cartItems.reduce((total, item) => total + item.ProductQuantity, 0)}
                            </p>
                            <h4>
                                Total Price: ₹
                                {cartItems.reduce((total, item) => {
                                    const product = products[item.ProductID];
                                    return total + (product ? product.ProductPrice * item.ProductQuantity : 0);
                                }, 0)}
                            </h4>
                            <button className="btn btn-primary w-100 mt-3" onClick={proceedToCheckout}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
