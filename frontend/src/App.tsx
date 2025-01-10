import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Profile from "./pages/Profile"
import MyProduct from "./pages/MyProduct"
import Create from "./pages/Create"
import NotFound from "./pages/NotFound"
import Product from "./pages/Product"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={ <h1>about</h1> } />
        <Route path="/search" element={ <Search/> } />
        <Route path="/profile" element={ <Profile/> } />
        <Route path="/my-product" element={ <MyProduct/> } />
        <Route path="/create-update-product" element={ <Create/> } />
        <Route path="/product/:id" element={ <Product/> } />
        <Route path="*" element={ <NotFound/> } />
      </Routes>
    </Router>
  )
}

export default App
