"use client";
import { useState } from "react";
import { signin } from "../../services/auth";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const { token, user } = await signin(email, password);
    console.log(user)
    setAuth(token, user);
    router.replace("/");
  }

  return (
    <div className="min-h-screen bg-slate-200 flex items-center">
      <form
        onSubmit={handleLogin}
        className="w-[300px] min-h-[400px] max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow"
      >
        <div className="text-center my-10">
          <h1 className="font-bold text-gray-800 ">Login to NotesKeeper</h1>
        </div>
        <div className="mb-2">
          <label className="font-semibold text-sm text-gray-500 ">
            Email Address
          </label>
          <input
            placeholder="abc@xyz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-1.5 my-1 border rounded text-xs "
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold text-sm text-gray-500 ">
            Password
          </label>
          <input
            type="password"
            placeholder="123456"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-1.5 my-1 text-xs border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 p-1 border rounded text-white text-sm"
        >
          Sign In
        </button>

        <div>
          <p className="text-center text-sm text-gray-500 mt-4">
            {"Don't have an account?"}{" "}
            <a href="/signup" className="text-indigo-600 font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
