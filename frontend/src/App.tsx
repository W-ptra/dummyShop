import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Profile from "./pages/Profile"
import MyProduct from "./pages/MyProduct"
import Create from "./pages/Create"
import NotFound from "./pages/NotFound"
import Product from "./pages/Product"
import Transaction from "./pages/Transaction"
import Cart from "./pages/Cart"
import Help from "./pages/Help"
import Setting from "./pages/Setting"
import Checkout from "./pages/Checkout"
import UpdateDelete from "./pages/UpdateDelete"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<h1>about</h1>} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-product" element={<MyProduct />} />
        <Route path="/create-product" element={<Create />} />
        <Route path="/update-delete-product/:id" element={<UpdateDelete />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/help" element={<Help />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
