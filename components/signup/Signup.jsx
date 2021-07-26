import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/client";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword: confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      console.log("Fill all fields");
    }
  };

  return (
    <section className="w-full flex justify-center mt-14">
      <div className="w-3/4 flex flex-col">
        <h1 className="authLetter">Sign up</h1>
        <form className="mt-14 justify-center">
          <div className="authContainer">
            <div className="authLabelContainer">
              <label htmlFor="Name" className="authLabel">
                Name *
              </label>
            </div>
            <input
              id="Name"
              autoComplete="false"
              tabIndex="0"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="authInput"
            />
          </div>
          <div className="authContainer">
            <div className="authLabelContainer">
              <label htmlFor="email" className="authLabel">
                Email *
              </label>
            </div>
            <input
              id="email"
              autoComplete="false"
              tabIndex="0"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="authInput"
            />
          </div>

          <div className="authContainer">
            <div className="authLabelContainer">
              <label htmlFor="password" className="authLabel">
                Password *
              </label>
            </div>
            <input
              id="password"
              autoComplete="false"
              tabIndex="0"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="authInput"
            />
          </div>

          <div className="authContainer">
            <div className="authLabelContainer">
              <label htmlFor="cpassword" className="authLabel">
                Confirm Password *
              </label>
            </div>
            <input
              id="cpassword"
              autoComplete="false"
              tabIndex="0"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="authInput"
            />
          </div>
          <div className="w-full flex justify-center">
            <button className="authButton" onClick={handleSubmit}>
              Create Account
            </button>
          </div>
        </form>
        <div className="w-full my-4 flex items-center justify-center">
          <div className="bg-black-100 h-h w-full"></div>
          <p className="text-center mx-4 my-1 text-black-100">or</p>
          <div className="bg-black-100 h-h w-full"></div>
        </div>
        <div className="w-full">
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/api/auth/callback/google",
              })
            }
            className="flex items-center justify-center border border-solid border-black-100 rounded px-5 py-3 m-auto"
          >
            <FcGoogle />
            <span className="ml-2 text-xs font-extrabold text-black-200">
              Sign up with Google
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Signup;
