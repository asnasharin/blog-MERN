import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { login } from "../../services/authServices"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { reset } from "../../features/authSlices"


function LoginPage() {

  const dispatch = useAppDispatch()
  const { isSuccess, isError, errorMessage} = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login({email, password}))
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("signup successfully")
       navigate("/")
        dispatch(reset()) 
    }

    if (isError) {
      toast.error(errorMessage?.message || "login failed")
      dispatch(reset())
    }
  }, [isSuccess, isError, errorMessage, dispatch])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form 
        onSubmit={handleSubmit}
        className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e)=> setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage