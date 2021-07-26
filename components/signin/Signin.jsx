import React, { useRef } from "react";
import { signIn } from "next-auth/client";

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e, credential) => {
    e.preventDefault();
    signIn(credential, {
      callbackUrl: "http://localhost:3000/user/home",
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <section className="w-full flex justify-center mt-14">
      <div className="w-3/4 flex flex-col">
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
            <button
              className="authButton"
              onClick={(e) => handleSubmit(e, "credentials")}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signin;
