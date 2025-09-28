"use client";
import { useState } from "react";
import { signup } from "../../services/auth";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);
    const router = useRouter();
  async function handleSignup(e) {
    e.preventDefault();
    const { token, user } = await signup(name, email, password);
    setAuth(token, user);
    router.replace("/");
  }

  return (
    <div className="min-h-screen bg-slate-200 flex items-center">

 
    <form onSubmit={handleSignup} className="w-[300px] min-h-[400px] max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow flex flex-col justify-between">
        <div className="text-center my-5">
            <h1 className="font-bold text-gray-800">Sign Up to NotesKeeper</h1>
        </div>
      <div className="mb-2">
        <label className="font-semibold text-sm text-gray-500 ">Name</label>
        <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-1.5 my-1 border rounded text-xs"
      />
      </div>
      <div className="mb-2">
        <label className="font-semibold text-sm text-gray-500 ">Email Address</label>
        <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-1.5 my-1 border rounded text-xs"
      />
      </div>
      <div className="mb-4">
        <label className="font-semibold text-sm text-gray-500 ">Password</label>
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-1.5 my-1 border rounded text-xs"
      />
      </div>
      
      <button type="submit" className="w-full bg-indigo-600 p-1 border rounded text-white text-sm">Sign Up</button>
      <div>
        <p className="text-center text-sm text-gray-500 mt-4">Already have an account? <a href="/signin" className="text-indigo-600 font-semibold">Sign In</a></p>
      </div>
    </form>
       </div>
  );
}
