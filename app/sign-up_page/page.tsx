"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/auth/sign-up", {
        username,
        email,
        password,
      });

      toast.success("Account created successfully");

      setTimeout(() => {
        router.push("/Dashboard");
      }, 1200);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center">
          Create Account
        </h1>
        <p className="text-gray-500 text-center mt-2 text-sm sm:text-base">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-2.5 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-2.5 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-2.5 focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 sm:py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
