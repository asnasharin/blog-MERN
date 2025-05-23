import LoginPage from "./pages/LoginPage/LoginPage"
import { Routes, Route } from "react-router-dom"
import SignupPage from "./pages/SignupPage/SignupPage"

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
      
    </>
  )
}

export default App
