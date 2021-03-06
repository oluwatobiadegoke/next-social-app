import React, { useState, useEffect } from "react";

import Spinner from "../utils/Spinner";

const Signup = ({ setIsMember, setIsSignup }) => {
  const [spinner, setSpinner] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsError(false);
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [isError]);

  const handleSubmit = (e) => {
    setSpinner(true);
    e.preventDefault();
    if (
      name.length &&
      email.length &&
      password.length &&
      confirmPassword.length
    ) {
      try {
        fetch("/api/auth/signup", {
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
            if (data.response === "0") {
              setSpinner(false);
              setIsError(true);
              setMessage(data.message);
            } else {
              setIsMember(true);
              setIsSignup(true);
              setSpinner(false);
            }
          });
      } catch (error) {
        setSpinner(false);
        setIsError(true);
        setMessage(
          "Failure to login! Kindly check if you have an established connection. Otherwise, try again!"
        );
        console.log(error);
      }
    } else {
      setIsError(true);
      setMessage("Fill all fields");
      setSpinner(false);
    }
  };

  return (
    <section className="w-full flex justify-center mt-14">
      <div className="w-full md:w-3/4 flex flex-col">
        {isError && (
          <div className="bg-red-500 text-white text-sm font-bold py-2 px-4 rounded flex justify-center items-center mb-4">
            <p>{message}</p>
          </div>
        )}
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
            {spinner ? (
              <button className="authButton" disabled>
                <p className="mr-3">Creating Account</p>
                <Spinner />
              </button>
            ) : (
              <button className="authButton" onClick={(e) => handleSubmit(e)}>
                Create Account
              </button>
            )}
          </div>
        </form>
        <div className="w-full my-4 flex items-center justify-center">
          <div className="bg-black-100 h-h w-full"></div>
          <p className="text-center mx-4 my-1 text-black-100">or</p>
          <div className="bg-black-100 h-h w-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
