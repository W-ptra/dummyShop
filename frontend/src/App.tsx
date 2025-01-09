import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Profile from "./pages/Profile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={ <h1>about</h1> } />
        <Route path="/search" element={ <Search/> } />
        <Route path="/profile" element={ <Profile/> } />
      </Routes>
    </Router>
  )
}

export default App
