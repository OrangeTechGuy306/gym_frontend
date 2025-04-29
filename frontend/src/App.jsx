import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from "./pages/Login"
import Signup from "./pages/Signup"
import Homepage from "./pages/Homepage"



function App() {
 

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
