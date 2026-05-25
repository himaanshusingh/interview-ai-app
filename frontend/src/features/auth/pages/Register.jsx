import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center">
        <h1 className="text-xl font-semibold text-white">Loading.......</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="flex min-w-[350px] flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">Register</h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm text-white/90">
              Username
            </label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              className="rounded-xl border-0 bg-white px-4 py-3 text-gray-900 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-white/90">
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="rounded-xl border-0 bg-white px-4 py-3 text-gray-900 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-white/90">
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="rounded-xl border-0 bg-white px-4 py-3 text-gray-900 outline-none"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded-2xl border-0 bg-accent-dark px-6 py-3 text-white transition-all duration-300 outline-none active:scale-90"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-accent-dark no-underline hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
