import MenuIcon from './../assets/menu.svg'
import UserIcon from './../assets/user.svg'
import WishlistIcon from './../assets/wishlist.svg'
import CartIcon from './../assets/cart.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    async function getUserData(token) {
        try {
          const response = await fetch('http://localhost:3000/user/getOne', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching user data:', error);
          throw error;
        }
      }
      
      // Example usage in a component:
      useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
          getUserData(token)
            .then((userData) => {
                setUserData(userData);
            })
            .catch((error) => {
                console.log(error);                
            });
        }
      }, []);

    return (
        <>
            <header>
                <div className="container-fluid">
                    <div className="row py-3 border-bottom">

                        <div className="col-sm-4 col-lg-2 text-center text-sm-start d-flex gap-3 justify-content-center justify-content-md-start">
                            <div className="d-flex align-items-center my-3 my-sm-0">
                                <Link to='/'>
                                    <img src="images/logo.svg" alt="logo" className="img-fluid" />
                                </Link>
                            </div>
                        </div>

                        <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-4">
                            <div className="search-bar row bg-light p-2 rounded-4 justify-content-between"> 
                                <div className="col-11">
                                    <form id="search-form" className="text-center " action="index.html" method="post">
                                        <input type="text" className="form-control border-0 bg-transparent w-100" placeholder="Search for more than 20,000 products" />
                                    </form>
                                </div>
                                <div className="col-1"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <ul className="navbar-nav list-unstyled d-flex flex-row gap-3 gap-lg-5 justify-content-center flex-wrap align-items-center mb-0 fw-bold text-uppercase text-dark">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/category">Category</Link>
                                </li>
                                <li className="nav-item active">
                                    <a href="index.html" className="nav-link">Orders</a>
                                </li>
                                <li className="nav-item active">
                                    <a href="index.html" className="nav-link">About Us</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-sm-8 col-lg-2 d-flex gap-5 align-items-center justify-content-center justify-content-sm-end">
                            <ul className="d-flex justify-content-end list-unstyled m-0">
                                {
                                    localStorage.getItem("token") != null || sessionStorage.getItem("token") != null
                                    ?   <li>
                                            <a href="#" className="p-2 mx-1">
                                                <img src={'./../../Images/userImage/'+userData.UserProfileImage} alt="user" width={24} height={24} />
                                            </a>
                                        </li>
                                    :   <>
                                            <li>
                                                <Link to='/login'>
                                                    <h5 className='mx-2'>Log in</h5>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/register'>
                                                    <h5 className='mx-2'>Sign up</h5>
                                                </Link>
                                            </li>
                                        </>
                                }
                                <li>
                                    <a href="#" className="p-2 mx-1">
                                        <img src={WishlistIcon} alt="wishlist" width={32} height={32} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="p-2 mx-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                                        <img src={CartIcon} alt="cart" width={32} height={32} />
                                    </a>
                                </li>
                                { 
                                    localStorage.getItem("token") != null || sessionStorage.getItem("token") != null 
                                    ?   <li>
                                            <button onClick={()=>{
                                                if(localStorage.getItem("token") != null) localStorage.removeItem("token");
                                                else if(sessionStorage.getItem("token") != null) sessionStorage.removeItem("token");
                                                navigate("/");
                                            }}>Log out</button>
                                        </li> 
                                    : null
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            </header>
        </>
    );
}