import { useState } from 'react'

import Header from './Components/Header'

import MainBanner from './pages/home/MainBanner'
import CategorySection from './pages/home/CategorySection'
import BestProductSection from './pages/home/BestProductSection'
import SubBanners from './pages/home/SubBanners'
import FeaturedProductSection from './pages/home/FeaturedProductSection'
import DiscountBanner from './pages/home/DiscountBanner'
import PopularProductsSection from './pages/home/PopularProductsSection'
import ArrivedPorductSection from './pages/home/ArrivedPorductSection'
import AppAdBanner from './pages/home/AppAdBanner'
import SuggestionSection from './pages/home/SuggestionSection'
import FunctionalityCardSection from './pages/home/FunctionalityCardSection'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasCart">
        <div className="offcanvas-header justify-content-center">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Growers cider</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$12</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Fresh grapes</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$8</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Heinz tomato ketchup</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$20</strong>
              </li>
            </ul>
    
            <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
          </div>
        </div>
      </div>

        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar">

        <div className="offcanvas-header justify-content-between">
          <h4 className="fw-normal text-uppercase fs-6">Menu</h4>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div className="offcanvas-body">
      
          <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
            <li className="nav-item border-dashed active">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#fruits"></use></svg>
                <span>Fruits and vegetables</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#dairy"></use></svg>
                <span>Dairy and Eggs</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#meat"></use></svg>
                <span>Meat and Poultry</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#seafood"></use></svg>
                <span>Seafood</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#bakery"></use></svg>
                <span>Bakery and Bread</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#canned"></use></svg>
                <span>Canned Goods</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#frozen"></use></svg>
                <span>Frozen Foods</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#pasta"></use></svg>
                <span>Pasta and Rice</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#breakfast"></use></svg>
                <span>Breakfast Foods</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#snacks"></use></svg>
                <span>Snacks and Chips</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <button className="btn btn-toggle dropdown-toggle position-relative w-100 d-flex justify-content-between align-items-center text-dark p-2" data-bs-toggle="collapse" data-bs-target="#beverages-collapse" aria-expanded="false">
                <div className="d-flex gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#beverages"></use></svg>
                  <span>Beverages</span>
                </div>
              </button>
              <div className="collapse" id="beverages-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal ps-5 pb-1">
                  <li className="border-bottom py-2"><a href="index.html" className="dropdown-item">Water</a></li>
                  <li className="border-bottom py-2"><a href="index.html" className="dropdown-item">Juice</a></li>
                  <li className="border-bottom py-2"><a href="index.html" className="dropdown-item">Soda</a></li>
                  <li className="border-bottom py-2"><a href="index.html" className="dropdown-item">Tea</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#spices"></use></svg>
                <span>Spices and Seasonings</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#baby"></use></svg>
                <span>Baby Food and Formula</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#health"></use></svg>
                <span>Health and Wellness</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#household"></use></svg>
                <span>Household Supplies</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#personal"></use></svg>
                <span>Personal Care</span>
              </a>
            </li>
            <li className="nav-item border-dashed">
              <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#pet"></use></svg>
                <span>Pet Food and Supplies</span>
              </a>
            </li>
          </ul>
        
        </div>

      </div>

      <Header />
      
      <MainBanner />

      <CategorySection />

      <BestProductSection />

      <SubBanners />

      <FeaturedProductSection />

      <DiscountBanner />

      <PopularProductsSection />

      <ArrivedPorductSection />

      <AppAdBanner />

      <SuggestionSection />

      <FunctionalityCardSection />

      <Footer />
    </>
  )
}

export default App
