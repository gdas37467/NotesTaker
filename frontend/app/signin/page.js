"use client";
import { useState } from "react";
import { signin } from "../../services/auth";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
  import { ToastContainer, toast } from 'react-toastify';


export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
  try{

    const { token, user } = await signin(email, password);
    console.log(user)
    setAuth(token, user);
    router.replace("/");
    toast.success(`Welcome ${user.user_name}`)
  }catch(e)
  {
    console.log(e.response.data.error)
    // toast('Rama')
    toast.error(e.response.data.error)
    console.log('Hi')
  }
    
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center">
      <form
        onSubmit={handleLogin}
        className="w-[300px] min-h-[400px] max-w-sm mx-auto mt-10 p-6 bg-orange-100 rounded shadow"
      >
        <div className="text-center my-10">
          <h1 className="font-bold text-orange-950 ">Login to Notes</h1>
        </div>
        <div className="mb-2">
          <label className="font-semibold text-sm text-orange-950  ">
            Email Address
          </label>
          <input
            placeholder="abc@xyz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-1.5 my-1 border border-orange-700 focus:outline-none focus:border-orange-800 transition-colors duration-200 focus:ring-1 focus:ring-orange-800 rounded text-xs "
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold text-sm text-orange-950  ">
            Password
          </label>
          <input
            type="password"
            placeholder="123456"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-1.5 my-1 text-xs border border-orange-700 focus:outline-none focus:border-orange-800 transition-colors duration-200 focus:ring-1 focus:ring-orange-800 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 p-1 border rounded text-orange-950 text-sm"
        >
          Sign In
        </button>

        <div>
          <p className="text-center text-sm text-orange-500 mt-4">
            {"Don't have an account?"}{" "}
            <a href="/signup" className="text-indigo-600 font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}
