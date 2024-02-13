import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Cart from "./Components/Cart/Cart"
import Conatct from "./Components/Contact"
import Home from "./Components/Home"
import Footer from "./Components/Layout/Footer"
import Navbar from "./Components/Layout/Navbar"
import PaymentMode from "./Components/Cart/PaymentMode"
import Shipping from "./Components/Cart/Shipping"
import PaymentSuccess from "./Components/Cart/PaymentSuccess"
import LoginSignUp from "./Components/User/LoginSignUp"
import Profile from "./Components/User/Profile"
import MyOrders from "./Components/Orders/MyOrders"
import OrderDetails from "./Components/Orders/OrderDetails"
import Dashboard from "./Components/Admin/Dashboard"
import AllUsers from "./Components/Admin/AllUsers"
import NotFound from "./Components/Layout/NotFound/indesx"
import AdminOrders from "./Components/Admin/Orders"
import AllProducts from "./Components/Admin/AllProducts"
import AddProduct from "./Components/Admin/AddProduct"
import Store from "./Components/Products/Store"
import ProductDetails from "./Components/Products/ProductDetails"
import Search from "./Components/Products/Search"
import UpdateUser from "./Components/Admin/UpdateUser"
import ForgotPassword from "./Components/User/ForgotPassword"
import ResetPassword from "./Components/User/ResetPassword"
import UpdatePassword from "./Components/User/UpdatePassword"
import UpdateProfile from "./Components/User/UpdateProfile"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/ProtectedRoute/index.jsx'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js'
import { useDispatch, useSelector } from 'react-redux'
import { userExist, userNotExist } from './redux/reducer/userReducer.js'
import { getUser } from './redux/api/userAPI.js'
import { UserReducerInitialState } from './types/reducer-types.js'
import Loader from './Components/Layout/Loader/index.js'
import UpdateProduct from './Components/Admin/UpdateProduct/index.js'


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer) || {};
  const [isComponentLoading, setComponentLoading] = useState(true);
  const [isApiCallComplete, setApiCallComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const data = await getUser(user.uid);
          dispatch(userExist(data.user));
        } else {
          dispatch(userNotExist());
        }
      } catch (error) {
        dispatch(userNotExist());
      } finally {
        setComponentLoading(false);
        setApiCallComplete(true);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading || isComponentLoading || !isApiCallComplete) {
    return <Loader />;
  }

  return (
    loading ? <Loader /> :
      <>
        <BrowserRouter>
          <ToastContainer />
          <Navbar isAuthenticated={user ? true : false} isAdmin={user?.role === "admin"} />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Conatct />} />
            <Route path="/cart" element={<Cart />} />

            <Route
              path="/login"
              element={
                <ProtectedRoute isAuthenticated={user ? false : true}>
                  <LoginSignUp />
                </ProtectedRoute>
              }
            />

            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />

            <Route element={<ProtectedRoute adminOnly={true} admin={user?.role === "admin"} isAuthenticated={user ? true : false} />}>
              <Route path="/admin/user/:id" element={<UpdateUser />} />
              <Route path="/admin/products" element={<AllProducts />} />
              <Route path="/admin/product" element={<AddProduct />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<AllUsers />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/product/:id" element={<UpdateProduct />} />
            </Route>

            <Route element={<ProtectedRoute adminOnly={false} isAuthenticated={user ? true : false} />}>
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/paymentMode" element={<PaymentMode />} />
              <Route path="/paymentSuccess" element={<PaymentSuccess />} />
              <Route path='/password/update' element={<UpdatePassword />} />
              <Route path='/me/update' element={<UpdateProfile />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
            </Route>


            <Route path='/*' element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
  )
}

export default App;
