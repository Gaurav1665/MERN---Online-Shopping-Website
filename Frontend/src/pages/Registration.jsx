import React, { useState } from 'react';
import './login/login.css'; // Ensure the provided CSS is in this file.

export default function Registration() {
  const [formData, setFormData] = useState({
    UserProfileImage: '',
    UserName: '',
    UserEmail: '',
    UserPassword: '',
    UserContact: '',
    UserAddress: '',
    UserCity: '',
    UserState: '',
    UserCountry: '',
    UserPincode: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle image file change and upload it
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can add image validation here (e.g., check file type or size)

      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('file', file);

      // Upload the image to the server or cloud storage (this is just a placeholder URL)
      setLoading(true);
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Assuming the server returns the URL of the uploaded image
            setFormData((prevData) => ({
              ...prevData,
              UserProfileImage: data.imageUrl, // Store the image URL in state
            }));
          } else {
            setError('Error uploading the image');
          }
        })
        .catch(() => {
          setError('Error uploading the image');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.UserName ||
      !formData.UserEmail ||
      !formData.UserPassword ||
      !formData.UserContact ||
      !formData.UserAddress ||
      !formData.UserCity ||
      !formData.UserState ||
      !formData.UserCountry ||
      !formData.UserPincode
    ) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call to the backend to register the user (replace URL with your own)
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to login or home page upon successful registration
        // navigate('/login'); // Uncomment if you use react-router-dom for navigation
        alert('Registration successful!');
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Error while communicating with the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="UserProfileImage" className="form-label">
              Profile Image
            </label>
            <input
              type="file"
              className="form-control"
              id="UserProfileImage"
              name="UserProfileImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.UserProfileImage && (
              <div className="mt-2">
                <img
                  src={formData.UserProfileImage}
                  alt="Profile"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="UserName" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="UserName"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="UserEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="UserEmail"
              name="UserEmail"
              value={formData.UserEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="UserPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="UserPassword"
              name="UserPassword"
              value={formData.UserPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="UserContact" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              className="form-control"
              id="UserContact"
              name="UserContact"
              value={formData.UserContact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="UserAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="UserAddress"
              name="UserAddress"
              value={formData.UserAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="UserCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="UserCity"
              name="UserCity"
              value={formData.UserCity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="UserState" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="UserState"
              name="UserState"
              value={formData.UserState}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="UserCountry" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="UserCountry"
              name="UserCountry"
              value={formData.UserCountry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="UserPincode" className="form-label">
              Pincode
            </label>
            <input
              type="text"
              className="form-control"
              id="UserPincode"
              name="UserPincode"
              value={formData.UserPincode}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}