"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/auth/sign-in", { email, password });

      toast.success("Signed in successfully");

      setTimeout(() => {
        router.push("/Dashboard");
      }, 1000);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mt-2 text-sm sm:text-base">
          Sign in to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs sm:text-sm text-gray-500 text-center mt-6">
          Dont have an account?{" "}
          <a href="/sign-up_page" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
