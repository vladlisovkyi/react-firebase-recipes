import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const location = useLocation();

  const { signIn, signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const isSignUp = location.search.includes("type=signup");

  const handleInputChange = (e, setter) => {
    setError(null);
    setter(e.target.value);
  };
  const handleSubmit = (e) => {
    setError(null);
    e.preventDefault();
    try {
      if (isSignUp) {
        if (password === confirmPassword) {
          signUp(email, password);
        } else {
          setError("Password and confirm password do not match.");
        }
      } else {
        signIn(email, password);
      }
    } catch (e) {
      return alert("Error:", e.message);
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          {isSignUp ? "Sign Up Page" : "Sign In Page"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded-lg px-4 py-2 w-full outline-none text-gray-900"
              required
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded-lg px-4 py-2 w-full outline-none text-gray-900"
              required
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
          </div>
          {isSignUp && (
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border rounded-lg px-4 py-2 w-full outline-none text-gray-900"
                required
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
              />
            </div>
          )}
          <Link
            to={isSignUp ? "/signin?type=signin" : "/signin?type=signup"}
            className="text-sm block hover:underline text-gray-900"
          >
            {isSignUp
              ? "Have an account? Sign in"
              : "Don't have an account? Sign Up"}
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 block mt-6 mx-auto"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <p className="text-center text-red-500 text-sm mt-2">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
