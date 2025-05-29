import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { signup } from "../../services/authServices"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom"
import { reset } from "../../features/authSlices"

function SignupPage() {
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isError, isSuccess, errorMessage } = useAppSelector((state) => state.auth)

  
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(signup({ name, email, password }))
  }

   useEffect(() => {
    if (isSuccess) {
      toast.success("Signup successful!");
      navigate("/login")
    
        dispatch(reset())
    
    }
    if (isError) {
      toast.error(errorMessage?.message || "Signup failed");
      dispatch(reset())
    }
  }, [isSuccess, isError, errorMessage, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
