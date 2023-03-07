import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import CreateProductScreen from "./screens/CreateProductScreen";
import EditProductScreen from "./screens/EditProductScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SelllerRoute";
import SellerScreen from "./screens/SellerScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/seller/:id" element={<SellerScreen />}></Route>
            <Route path="/cart" element={<CartScreen />} exact></Route>
            <Route path="/product/:id" element={<ProductScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/search/name/:name" element={<SearchScreen />}></Route>
            <Route
              path="/search/category/:category"
              element={<SearchScreen />}
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              element={<SearchScreen />}
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNum/:pageNum"
              element={<SearchScreen />}
            ></Route>
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/products"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
              exact
            ></Route>
            <Route
              path="/admin/products/create"
              element={
                <AdminRoute>
                  <CreateProductScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/products/:id/edit"
              element={
                <AdminRoute>
                  <EditProductScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/orders"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
              exact
            ></Route>
            <Route
              path="/products/seller"
              element={
                <SellerRoute>
                  <ProductListScreen />
                </SellerRoute>
              }
            ></Route>
            <Route
              path="/orders/seller"
              element={
                <SellerRoute>
                  <OrderListScreen />
                </SellerRoute>
              }
            ></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
