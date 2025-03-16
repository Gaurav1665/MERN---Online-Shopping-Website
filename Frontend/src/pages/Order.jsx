import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setError("You need to log in to view your orders.");
      setLoading(false);
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-4">
      <h2>Your Orders</h2>

      {loading && <p>Loading your orders...</p>}
      {error && <p className="text-danger">{error}</p>}

      {orders.length === 0 && !loading && !error && (
        <p>You have no orders yet.</p>
      )}

      {orders.length > 0 && (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm">
                <h5>Order ID: {order._id}</h5>
                <p><strong>Order Date:</strong> {formatDate(order.OrderDate)}</p>
                <p><strong>Total Amount:</strong> ₹{order.TotalAmount}</p>
                <p><strong>Status:</strong> {order.status}</p>

                <h6>Products:</h6>
                <ul>
                  {order.ProductItems.map((item) => (
                    <li key={item.ProductID}>
                      {item.ProductID.ProductName} (x{item.ProductQuantity}) - ₹
                      {item.ProductID.ProductPrice * item.ProductQuantity}
                    </li>
                  ))}
                </ul>

                {/* Only show status; no option for the user to update */}
                {order.status === "Pending" && (
                  <p className="text-warning">Your order is still pending.</p>
                )}

                {order.status === "Delivered" && (
                  <p className="text-success">Your order has been delivered.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
