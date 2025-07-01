import LoginPage from "./pages/LoginPage/LoginPage"
import { Routes, Route } from "react-router-dom"
import SignupPage from "./pages/SignupPage/SignupPage"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { ToastContainer } from "react-toastify"
import HomePage from "./pages/HomePage/HomePage"
import Protect from "./components/Auth/Protect"
import Authenticate from "./components/Auth/Authenticate"
import Dashboard from "./pages/Dashboard/Dashboard"
import CreateBlog from "./components/CreateBlog/CreateBlog"
import BlogList from "./components/BlogList/BlogList"

function App() {
  

  return (
    <>
    <ToastContainer />
      <Provider store={store}>
      <Routes>
        <Route element={<Authenticate />}>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<Protect />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="blogs" element={<BlogList />} />
      </Route>
    </Routes>
    </Provider>  
    </>
  )
}

export default App
