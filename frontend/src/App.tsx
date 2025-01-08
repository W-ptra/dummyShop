import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={ <h1>about</h1> } />
        <Route path="/search" element={ <Search/> } />
      </Routes>
    </Router>
  )
}

export default App
