import React, { useRef, useState, useEffect } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import Spinner from "../utils/Spinner";

const Signin = ({ isSignup, setIsSignup }) => {
  const [spinner, setSpinner] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsError(false);
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [isError]);

  const handleSubmit = async (e, credential) => {
    e.preventDefault();
    setIsSignup(false);
    setSpinner(true);
    if (emailRef.current.value.length && passwordRef.current.value.length) {
      try {
        const result = await signIn(credential, {
          redirect: false,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        if (result.error) {
          setSpinner(false);
          setIsError(true);
          setMessage("Couldn't sign you in. Please try again.");
        }
        router.push("/user/home");
        setSpinner(false);
      } catch (error) {
        setSpinner(false);
        setIsError(true);
        setMessage("Couldn't sign you in. Please try again.");
      }
    } else {
      setSpinner(false);
      setIsError(true);
      setMessage("Please fill all parameters!!!");
    }
  };

  return (
    <section className="w-full flex justify-center mt-14">
      <div className="w-full md:w-3/4 flex flex-col">
        {isSignup && (
          <div className="bg-green-500 text-white text-sm font-bold py-2 px-4 rounded flex justify-center items-center mb-4">
            <p>
              Your account has been successfully created! Please type in your
              details to login.
            </p>
          </div>
        )}
        {isError && (
          <div className="bg-red-400 text-white text-sm font-bold py-2 px-4 rounded flex justify-center items-center mb-4">
            <p>{message}</p>
          </div>
        )}
        <h1 className="authLetter">Sign in</h1>
        <form className="mt-14 justify-center">
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
              className="authInput"
              ref={emailRef}
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
              className="authInput"
              ref={passwordRef}
            />
          </div>
          <div className="w-full flex justify-center">
            {spinner ? (
              <button className="authButton" disabled>
                <p className="mr-3">Signing In</p>
                <Spinner />
              </button>
            ) : (
              <button
                className="authButton"
                onClick={(e) => handleSubmit(e, "credentials")}
              >
                Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signin;
