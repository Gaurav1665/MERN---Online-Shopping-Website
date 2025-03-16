import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Layout from './Layout'
import Home from "./pages/Home";
import CategoryProducts from "./pages/CategoryProducts";
import CategoryList from "./pages/CategoryList";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProductDetail from "./pages/ProductDetail";
import Cart from './pages/Cart';
import Order from './pages/Order';
import Wishlist from './pages/Wishlist';


function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Layout />}>
                      <Route index element={ <Home /> } ></Route>
                      <Route path="/category" element={ <CategoryList /> } ></Route>
                      <Route path="/categoryproducts/:categoryId" element={<CategoryProducts />} />
                      <Route path="/product/:productId" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path='/order' element={<Order />} />
                      <Route path='/wishlist' element={<Wishlist />} />
                  </Route>
                  <Route path="/login" element={ <Login /> } ></Route>
                  <Route path='/register' element={ <Registration /> } ></Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;